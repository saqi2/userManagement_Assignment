import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from 'src/domain/dto/role/createRole.dto';
import { EditRoleDto } from 'src/domain/dto/role/editRole.dto';
import { ListRoleDto } from 'src/domain/dto/role/listRole.dto';
import { Role } from 'src/infrastructure/database/postgres/models/role.model';
import { RoleRepository } from 'src/infrastructure/database/postgres/repositories/role.repository';
import { ListOutPut } from 'src/shared/interfaces/base_interface/listOutPut.interface';

@Injectable()
export class RoleService {
  constructor (public readonly roleRepository: RoleRepository) {}
  create (createRoleData: CreateRoleDto): Promise<Role> {
    return this.roleRepository.createRole(createRoleData);
  }

  getRole (id: number): Promise<Role> {
    return this.roleRepository.findRoleById(id);
  }

  edit (id: number, modifications: EditRoleDto): Promise<Role> {
    return this.roleRepository.editRoleById(id, modifications);
  }

  delete (id: number) : Promise<Role> {
    return this.roleRepository.deleteRoleById(id);
  }

  getAll (query: ListRoleDto):Promise<ListOutPut<any>> {
    return this.roleRepository.listRoleByQuery(query);
  }
}
