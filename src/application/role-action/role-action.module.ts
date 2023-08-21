import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RoleActionService } from './role-action.service';
import { RoleActionController } from './role-action.controller';
import { RoleAction } from 'src/infrastructure/database/postgres/models/roleAction.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleActionRepository } from 'src/infrastructure/database/postgres/repositories/roleAction.repository';
import { checkExistenceMiddleware } from 'src/shared/middlewares/checkExistence.middleware';
import { ParamTypes } from 'src/shared/interfaces/base_interface/Params.interface';
import { ActionRepository } from 'src/infrastructure/database/postgres/repositories/action.repository';
import { RoleRepository } from 'src/infrastructure/database/postgres/repositories/role.repository';

@Module({
  imports: [ SequelizeModule.forFeature([ RoleAction ]) ],
  controllers: [ RoleActionController ],
  providers: [ RoleActionService, RoleActionRepository, ActionRepository, RoleRepository ],
})
export class RoleActionModule {
  constructor (private roleActionRepository: RoleActionRepository) {}
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(checkExistenceMiddleware(
        this.roleActionRepository,
        { paramName: 'roleActionId', paramType: ParamTypes.NUMBER, dataBaseField: 'id' }))
      .forRoutes(RoleActionController);
  }
}
