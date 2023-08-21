import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from 'src/domain/dto/userRole/createUserRole.dto';
import { ListUserRoleDto } from 'src/domain/dto/userRole/listUserRole.dto';
import { UserRole } from 'src/infrastructure/database/postgres/models/userRole.model';
import { RoleRepository } from 'src/infrastructure/database/postgres/repositories/role.repository';
import { UserRepository } from 'src/infrastructure/database/postgres/repositories/user.repository';
import { UserRoleRepository } from 'src/infrastructure/database/postgres/repositories/userRole.repository';
import { ErrorCreator } from 'src/shared/exception-handlers/custom-exception';
import { ListOutPut } from 'src/shared/interfaces/base_interface/listOutPut.interface';

@Injectable()
export class UserRoleService {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly userRoleRepository: UserRoleRepository,
  ) {}
  async addRoleToUser (createUserRoleData: CreateUserRoleDto): Promise<UserRole> {
    const user = await this.userRepository.findOneById(createUserRoleData.userId);

    if (!user) {
      throw new ErrorCreator([ { message: 'generic.not_found', param: 'user' } ], HttpStatus.NOT_FOUND);
    }


    const role = await this.roleRepository.findRoleById(createUserRoleData.roleId);

    if (!role) {
      throw new ErrorCreator([ { message: 'generic.not_found', param: 'role' } ], HttpStatus.NOT_FOUND);
    }

    return this.userRoleRepository.createUserRole(createUserRoleData);
  }


  delete (userRoleId: number): Promise<UserRole> {
    return this.userRoleRepository.deleteUserRoleById(userRoleId);
  }

  getAll (query: ListUserRoleDto):Promise<ListOutPut<any>> {
    return this.userRoleRepository.listUserRoleByQuery(query);
  }
}
