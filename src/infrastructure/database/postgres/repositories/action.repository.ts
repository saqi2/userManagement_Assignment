import {
  AbstractEntityRepository,
} from 'src/infrastructure/database/base_db/postgres/repositories/AbstractEntity.repository';
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ListOutPut } from 'src/shared/interfaces/base_interface/listOutPut.interface';
import { Action } from 'src/infrastructure/database/postgres/models/action.model';
import { CreateActionDto } from 'src/domain/dto/action/createAction.dto';
import { ListActionDto } from 'src/domain/dto/action/listAction.dto';
import { EditActionDto } from 'src/domain/dto/action/editAction.dto';

@Injectable()
export class ActionRepository extends AbstractEntityRepository<Action> {
  collectionName: string;
  constructor (public sequelize: Sequelize) {
    super(sequelize.model('Action'));
    this.collectionName = 'action';
    this.filterTypes = {
      id: 'in',
      menuId: 'in',
      isActive: 'equal',
      minimumKYCLevel: 'in',
      createdAt: 'range',

    };
  }

  createAction (createActionData: CreateActionDto): Promise<Action> {
    return this.create(createActionData);
  }

  findActionById (id: number) : Promise<Action> {
    const criteria = { id };
    return this.findOne(criteria);
  }


  deleteActionById (id: number): Promise<Action> {
    const criteria = { id };
    return this.update({ isActive: false }, criteria);
  }


  listActionByQuery (query: ListActionDto): Promise<ListOutPut<Action>> {
    return this.findAndCountAll(query);
  }

  editActionById (id: number, modifications: EditActionDto) :Promise<Action> {
    const criteria = { id };
    return this.update(modifications, criteria);
  }
}
