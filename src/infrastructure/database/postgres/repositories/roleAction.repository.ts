import {
  AbstractEntityRepository,
} from 'src/infrastructure/database/base_db/postgres/repositories/AbstractEntity.repository';
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CreateRoleActionDto } from 'src/domain/dto/roleAction/createRoleAction.dto';
// import { ListRoleActionDto } from 'src/domain/dto/roleAction/listRoleAction.dto';
import { ListOutPut } from 'src/shared/interfaces/base_interface/listOutPut.interface';
import { RoleAction } from 'src/infrastructure/database/postgres/models/roleAction.model';
import { EditRoleActionDto } from 'src/domain/dto/roleAction/editRoleAction.dto';
import { ListRoleActionDto } from 'src/domain/dto/roleAction/listRoleAction.dto';

@Injectable()
export class RoleActionRepository extends AbstractEntityRepository<RoleAction> {
  collectionName: string;
  constructor (public sequelize: Sequelize) {
    super(sequelize.model('RoleAction'));
    this.collectionName = 'role-action';
    this.filterTypes = {
      id: 'in',
      actionId: 'in',
      roleId: 'in',
      isActive: 'equal',
      createdAt: 'range',
    };
  }

  createRoleAction (createRoleActionData: CreateRoleActionDto): Promise<RoleAction> {
    return this.create(createRoleActionData);
  }

  findRoleActionById (id: number) : Promise<RoleAction> {
    const criteria = { id };
    return this.findOne(criteria);
  }


  deleteRoleActionById (id: number): Promise<RoleAction> {
    const criteria = { id };
    return this.update({ isActive: false }, criteria);
  }
  findActionsByRolesId (roleId: number[]): any {
    const criteria = { roleId };
    const Action = this.sequelize.model('Action');
    return this.findAll(criteria, { relation: [ { model: Action } ] });
  }

  editRoleActionById (id: number, modifications: EditRoleActionDto):Promise<RoleAction> {
    const criteria = { id };
    return this.update(modifications, criteria);
  }

  listRoleActionByQuery (query: ListRoleActionDto): Promise<ListOutPut<RoleAction>> {
    const role = this.sequelize.model('Role');
    const Action = this.sequelize.model('Action');
    return this.findAndCountAll(query, { relation: [ { model: role }, { model: Action } ] });
  }
}
