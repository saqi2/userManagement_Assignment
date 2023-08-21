import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Menu } from 'src/infrastructure/database/postgres/models/menu.model';
import { MenuRepository } from 'src/infrastructure/database/postgres/repositories/menu.repository';
import { ParamTypes } from 'src/shared/interfaces/base_interface/Params.interface';
import { checkExistenceMiddleware } from 'src/shared/middlewares/checkExistence.middleware';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  imports: [ SequelizeModule.forFeature([ Menu ]) ],
  controllers: [ MenuController ],
  providers: [ MenuService, MenuRepository ],
})
export class MenuModule {
  constructor (private menuRepository: MenuRepository) {}
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(checkExistenceMiddleware(
        this.menuRepository,
        { paramName: 'menuId', paramType: ParamTypes.NUMBER, dataBaseField: 'id' }))
      .forRoutes(MenuController);
  }
}
