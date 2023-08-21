import {
  AbstractEntityRepository,
} from 'src/infrastructure/database/base_db/postgres/repositories/AbstractEntity.repository';
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/infrastructure/database/postgres/models/user.model';
import { RegisterDto } from 'src/domain/dto/auth/register.dto';

@Injectable()
export class UserRepository extends AbstractEntityRepository<User> {
  constructor (public sequelize: Sequelize) {
    super(sequelize.model('User'));
    this.filterTypes = {
      name: 'like',
      id: 'in',
      email: 'equal',
      cellPhone: 'equal',
      fullName: 'equal',
      isActive: 'equal',
      createdAt: 'range',
      googleId: 'equal',
    };
  }

  createUser (registerDto: RegisterDto): Promise<User> {
    return this.create(registerDto);
  }

  updateUserById (id: number, update: any): Promise<User> {
    return this.update(update, { id });
  }

  findOneByEmailOrCellphone (loginData: string): Promise<User> {
    const criteria = {
      cellPhone: loginData,
      email: loginData,
    };

    return this.findOne(criteria, undefined, { or: [ 'email', 'cellPhone' ] });
  }

  findOneById (id: number) {
    const criteria = { id };
    return this.findOne({ criteria });
  }

  findOneByGoogleId (googleId: string) {
    return this.findOne({ googleId });
  }
}
