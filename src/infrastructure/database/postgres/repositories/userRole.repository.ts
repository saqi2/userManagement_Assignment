import {
  AbstractEntityRepository,
} from 'src/infrastructure/database/base_db/postgres/repositories/AbstractEntity.repository';
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { UserRole } from 'src/infrastructure/database/postgres/models/userRole.model';
import { CreateUserRoleDto } from 'src/domain/dto/userRole/createUserRole.dto';
import { ListUserRoleDto } from 'src/domain/dto/userRole/listUserRole.dto';
import { ListOutPut } from 'src/shared/interfaces/base_interface/listOutPut.interface';

@Injectable()
export class UserRoleRepository extends AbstractEntityRepository<UserRole> {
  collectionName: string;
  constructor (public sequelize: Sequelize) {
    super(sequelize.model('UserRole'));
    this.collectionName = 'user-role';
    this.filterTypes = {
      id: 'in',
      userId: 'in',
      roleId: 'in',
      isActive: 'equal',
    };
  }

  createUserRole (createUserRoleData: CreateUserRoleDto): Promise<UserRole> {
    return this.create(createUserRoleData);
  }

  findUserRoleById (id: number): Promise<UserRole> {
    const criteria = { id };
    return this.findOne(criteria);
  }

  deleteUserRoleById (id: number): Promise<UserRole> {
    const criteria = { id };
    return this.update({ isActive: false }, criteria);
  }

  listUserRoleByQuery (query: ListUserRoleDto): Promise<ListOutPut<UserRole>> {
    const role = this.sequelize.model('Role');
    const user = this.sequelize.model('User');
    return this.findAndCountAll(query, {
      relation: [ { model: role }, { model: user } ],
    });
  }

  findRolesByUserId (userId: number): Promise<UserRole[]> {
    const role = this.sequelize.model('Role');
    return this.findAll(
      { userId },
      { relation: [ { model: role } ] },
    );
  }
}
