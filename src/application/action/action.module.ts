import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Action } from 'src/infrastructure/database/postgres/models/action.model';
import { ActionRepository } from 'src/infrastructure/database/postgres/repositories/action.repository';
import { ActionController } from './action.controller';
import { ActionService } from './action.service';

@Module({
  imports: [ SequelizeModule.forFeature([ Action ]) ],
  controllers: [ ActionController ],
  providers: [ ActionService, ActionRepository ],
})
export class ActionModule {

}
