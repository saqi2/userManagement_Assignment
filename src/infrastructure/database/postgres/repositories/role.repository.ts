import {
  AbstractEntityRepository,
} from 'src/infrastructure/database/base_db/postgres/repositories/AbstractEntity.repository';
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Role } from 'src/infrastructure/database/postgres/models/role.model';
import { CreateRoleDto } from 'src/domain/dto/role/createRole.dto';
import { EditRoleDto } from 'src/domain/dto/role/editRole.dto';
import { ListRoleDto } from 'src/domain/dto/role/listRole.dto';
import { ListOutPut } from 'src/shared/interfaces/base_interface/listOutPut.interface';

@Injectable()
export class RoleRepository extends AbstractEntityRepository<Role> {
  collectionName: string;
  constructor (public sequelize: Sequelize) {
    super(sequelize.model('Role'));
    this.collectionName = 'roles';
    this.filterTypes = {
      id: 'in',
      title: 'like',
      searchTitle: 'like',
      isActive: 'equal',
    };
  }

  createRole (createRoleData: CreateRoleDto): Promise<Role> {
    return this.create(createRoleData);
  }

  findRoleById (id: number) : Promise<Role> {
    const criteria = { id };
    return this.findOne(criteria);
  }

  editRoleById (id: number, modifications: EditRoleDto) {
    const criteria = { id };
    return this.update(modifications, criteria);
  }

  deleteRoleById (id: number): Promise<Role> {
    const criteria = { id };
    return this.update({ isActive: false }, criteria);
  }


  listRoleByQuery (query: ListRoleDto): Promise<ListOutPut<Role>> {
    return this.findAndCountAll(query);
  }
}
