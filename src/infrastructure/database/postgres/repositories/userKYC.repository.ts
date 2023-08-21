import {
  AbstractEntityRepository,
} from 'src/infrastructure/database/base_db/postgres/repositories/AbstractEntity.repository';
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { UserKYC } from 'src/infrastructure/database/postgres/models/userKYC.model';
import { CreateUserKYCDto } from 'src/domain/dto/userKYC/createUserKYC.dto';
import { UpdateUserKYCDto } from 'src/domain/dto/userKYC/updateUserKYC.dto';

@Injectable()
export class UserKYCRepository extends AbstractEntityRepository<UserKYC> {
  constructor (public sequelize: Sequelize) {
    super(sequelize.model(UserKYC.name));
    this.filterTypes = {
      id: 'in',
      userId: 'in',
      serviceId: 'in',
      documentPath: 'equal',
      isDocumentAccepted: 'equal',
      isDone: 'equal',
      isAccepted: 'equal',
      isActive: 'equal',
      createdAt: 'range',
      createdBy: 'in',
      updatedBy: 'in',
      updatedAt: 'range',
      userIp: 'equal',
    };
  }

  createUser (data: CreateUserKYCDto): Promise<UserKYC> {
    return this.create(data);
  }

  updateOneById (id: number, update: UpdateUserKYCDto): Promise<UserKYC> {
    return this.update(update, { id });
  }

  findOneById (id: number) {
    const criteria = { id };
    return this.findOne({ criteria });
  }
}
