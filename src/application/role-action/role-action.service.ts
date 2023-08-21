import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleActionDto } from 'src/domain/dto/roleAction/createRoleAction.dto';
import { EditRoleActionDto } from 'src/domain/dto/roleAction/editRoleAction.dto';
import { ListRoleActionDto } from 'src/domain/dto/roleAction/listRoleAction.dto';
import { RoleAction } from 'src/infrastructure/database/postgres/models/roleAction.model';
import { ActionRepository } from 'src/infrastructure/database/postgres/repositories/action.repository';
import { RoleRepository } from 'src/infrastructure/database/postgres/repositories/role.repository';
import { RoleActionRepository } from 'src/infrastructure/database/postgres/repositories/roleAction.repository';
import { ErrorCreator } from 'src/shared/exception-handlers/custom-exception';
import { ListOutPut } from 'src/shared/interfaces/base_interface/listOutPut.interface';

@Injectable()
export class RoleActionService {
  constructor (
    private readonly roleActionRepository: RoleActionRepository,
    private readonly roleRepository: RoleRepository,
    private readonly actionRepository: ActionRepository,
  ) {}

  async addActionToRole (RoleActionData: CreateRoleActionDto):Promise<RoleAction> {
    const action = await this.actionRepository.findActionById(RoleActionData.actionId);

    if (!action) {
      throw new ErrorCreator([ { message: 'generic.not_found', param: 'role' } ], HttpStatus.NOT_FOUND);
    }


    const role = await this.roleRepository.findRoleById(RoleActionData.roleId);

    if (!role) {
      throw new ErrorCreator([ { message: 'generic.not_found', param: 'role' } ], HttpStatus.NOT_FOUND);
    }

    return this.roleActionRepository.createRoleAction(RoleActionData);
  }


  delete (id: number):Promise<RoleAction> {
    return this.roleActionRepository.deleteRoleActionById(id);
  }

  edit (id: number, modifications: EditRoleActionDto): Promise<RoleAction> {
    return this.roleActionRepository.editRoleActionById(id, modifications);
  }
  getAll (query: ListRoleActionDto):Promise<ListOutPut<any>> {
    return this.roleActionRepository.listRoleActionByQuery(query);
  }
}
