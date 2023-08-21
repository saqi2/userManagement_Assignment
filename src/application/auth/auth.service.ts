import { HttpStatus, Injectable } from '@nestjs/common';
import { ChangePasswordDto } from 'src/domain/dto/auth/changePassword.dto';
import { ForgotPasswordDto } from 'src/domain/dto/auth/forgotPassword.dto';
import { RegisterDto } from 'src/domain/dto/auth/register.dto';
import { User } from 'src/infrastructure/database/postgres/models/user.model';
import { UserRepository } from 'src/infrastructure/database/postgres/repositories/user.repository';
import { ErrorCreator } from 'src/shared/exception-handlers/custom-exception';
import { Bcrypt } from 'src/shared/helper/bcrypt';
import { RoleActionRepository } from 'src/infrastructure/database/postgres/repositories/roleAction.repository';
import { UserRoleRepository } from 'src/infrastructure/database/postgres/repositories/userRole.repository';
import { Action } from 'src/infrastructure/database/postgres/models/action.model';
import { CacheService } from 'src/infrastructure/cache/cache.service';
import { ExpiryModeEnum } from 'src/shared/interfaces/base_interface/RedisExpiryMode.enum';
import { JWTService } from 'src/infrastructure/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor (
    private userRepository: UserRepository,
    private jwtService: JWTService,
    private readonly redis: CacheService,
    private readonly redisService : JWTService,
    private readonly roleActionRepository: RoleActionRepository,
    private readonly userRoleRepository: UserRoleRepository,

  ) {}

  register (registerData: RegisterDto): Promise<User> {
    return this.userRepository.createUser(registerData);
  }

  async forgotPassword (data: ForgotPasswordDto): Promise<string> {
    this._checkEmailOrCellphoneExist(data);

    const emailOrCellphone = data.cellPhone ? data.cellPhone : data.email;
    const user = await this.userRepository.findOneByEmailOrCellphone(emailOrCellphone);

    if (!user) this.unAuthorizedError();

    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const expirationDate = now.setMinutes(now.getMinutes() + 5);

    await this.userRepository.updateUserById(user.id, { expirationDate, verificationCode });

    return 'success';
  }

  async changePassword (data: ChangePasswordDto): Promise<string> {
    this._checkEmailOrCellphoneExist(data);

    const emailOrCellphone = data.cellPhone ? data.cellPhone : data.email;
    const user = await this.userRepository.findOneByEmailOrCellphone(emailOrCellphone);

    if (!user) this.unAuthorizedError();

    if (user.verificationCode !== data.verificationCode) this.unAuthorizedError();

    if (!(new Date(+user.expirationDate) > new Date())) this.unAuthorizedError();

    if (data.confirmPassword !== data.password) this.unAuthorizedError();

    const hashedPassword = await Bcrypt.hashPassword(data.password);
    await this.userRepository.updateUserById(
      user.id,
      { password: hashedPassword, verificationCode: null, expirationDate: null },
    );

    return 'success';
  }

  whoami (user: User): User {
    delete user.password;
    delete user.verificationCode;
    delete user.expirationDate;
    return user;
  }

  async login (user: User): Promise<{ token: string }> {
    const payload = {
      id: user.id,
      googleId: user.googleId ? user.googleId : null,
    };

    await this._cacheUserActions(user);

    return {
      token: this.jwtService.sign(payload),
    };
  }


  async validateUserForLocalStrategy (username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOneByEmailOrCellphone(username);
    if (!user) this.unAuthorizedError();
    const isValidPassword = await Bcrypt.comparePassword(password, user.password);
    if (!isValidPassword) this.unAuthorizedError();
    return user;
  }

  async validateUserForGoogleStrategy (profile: any): Promise<User> {
    let user = await this.userRepository.findOneByGoogleId(profile.googleId);

    if (!user) {
      user = await this.userRepository.createUser(profile);
    }

    return user;
  }

  private unAuthorizedError () {
    throw new ErrorCreator([ { message: 'generic.unauthorized' } ], HttpStatus.UNAUTHORIZED);
  }

  private _checkEmailOrCellphoneExist (data: { cellPhone: string, email: string }): void {
    if (!(data.cellPhone || data.email)) {
      this.unAuthorizedError();
    }
  }

  private async _cacheUserActions (user: User) {
    const userRoles = await this.userRoleRepository.findRolesByUserId(user.id);
    const rolesId: number[] = [];
    userRoles?.forEach(userRole => {
      rolesId.push(userRole.role.id);
    });

    const roleActions = await this.roleActionRepository.findActionsByRolesId(rolesId);
    const actions : Action[] = [];
    roleActions?.forEach(roleAction => {
      actions.push(roleAction.action);
    });
    return this.redis.setRedisData(user.id, JSON.stringify(actions), ExpiryModeEnum.EX, 21600); // expireTime
  }
}
