import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserKYC } from 'src/infrastructure/database/postgres/models/userKYC.model';
import { UserKYCRepository } from 'src/infrastructure/database/postgres/repositories/userKYC.repository';
import { UserKYCService } from './useKYC.service';
import { UserKYCController } from './userKYC.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([ UserKYC ]),
  ],
  controllers: [ UserKYCController ],
  providers: [ UserKYCService, UserKYCRepository ],
})
export class UserKYCModule {}
