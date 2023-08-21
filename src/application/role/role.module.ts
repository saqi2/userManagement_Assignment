import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/infrastructure/database/postgres/models/role.model';
import { RoleRepository } from 'src/infrastructure/database/postgres/repositories/role.repository';
import { checkExistenceMiddleware } from 'src/shared/middlewares/checkExistence.middleware';
import { ParamTypes } from 'src/shared/interfaces/base_interface//Params.interface';

@Module({
  imports: [ SequelizeModule.forFeature([ Role ]) ],
  controllers: [ RoleController ],
  providers: [ RoleService, RoleRepository ],
})
export class RoleModule {
  constructor (private roleRepository: RoleRepository) {}
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(checkExistenceMiddleware(
        this.roleRepository,
        { paramName: 'roleId', paramType: ParamTypes.NUMBER, dataBaseField: 'id' }))
      .forRoutes(RoleController);
  }
}
