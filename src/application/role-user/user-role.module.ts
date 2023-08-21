import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRole } from 'src/infrastructure/database/postgres/models/userRole.model';
import { RoleRepository } from 'src/infrastructure/database/postgres/repositories/role.repository';
import { UserRepository } from 'src/infrastructure/database/postgres/repositories/user.repository';
import { UserRoleRepository } from 'src/infrastructure/database/postgres/repositories/userRole.repository';
import { ParamTypes } from 'src/shared/interfaces/base_interface/Params.interface';
import { checkExistenceMiddleware } from 'src/shared/middlewares/checkExistence.middleware';
import { UserRoleController } from './user-role.controller';
import { UserRoleService } from './user-role.service';

@Module({
  imports: [ SequelizeModule.forFeature([ UserRole ]) ],
  controllers: [ UserRoleController ],
  providers: [ UserRoleService, UserRoleRepository, UserRepository, RoleRepository ],
})
export class UserRoleModule {
  constructor (private userRoleRepository: UserRoleRepository) {}
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(checkExistenceMiddleware(
        this.userRoleRepository,
        { paramName: 'userRoleId', paramType: ParamTypes.NUMBER, dataBaseField: 'id' }))
      .forRoutes(UserRoleController);
  }
}
