import { Injectable } from '@nestjs/common';
import { CreateActionDto } from 'src/domain/dto/action/createAction.dto';
import { ActionRepository } from 'src/infrastructure/database/postgres/repositories/action.repository';
import { Action } from 'src/infrastructure/database/postgres/models/action.model';
import { ListActionDto } from 'src/domain/dto/action/listAction.dto';
import { ListOutPut } from 'src/shared/interfaces/base_interface/listOutPut.interface';
import { EditActionDto } from 'src/domain/dto/action/editAction.dto';


@Injectable()
export class ActionService {
  constructor (private readonly actionRepository :ActionRepository) {}


  create (createMenuData: CreateActionDto): Promise<Action> {
    return this.actionRepository.createAction(createMenuData);
  }

  getAll (query: ListActionDto):Promise<ListOutPut<any>> {
    return this.actionRepository.listActionByQuery(query);
  }

  edit (id: number, modifications: EditActionDto): Promise<Action> {
    return this.actionRepository.editActionById(id, modifications);
  }

  delete (id: number) : Promise<Action> {
    return this.actionRepository.deleteActionById(id);
  }
}
