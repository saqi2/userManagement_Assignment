
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/database/postgres/repositories/user.repository';
import { ErrorCreator } from 'src/shared/exception-handlers/custom-exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.USER_MANAGEMENT_GOOGLE_SECRET,
    });
  }

  async validate (payload: any) {
    const user = await this.userRepository.findOneById(payload.id);

    if (!user) throw new ErrorCreator([ { message: 'generic.unauthorized' } ], HttpStatus.UNAUTHORIZED);
    return user.get();
  }
}
