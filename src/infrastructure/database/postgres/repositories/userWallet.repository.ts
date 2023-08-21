import {
  AbstractEntityRepository,
} from 'src/infrastructure/database/base_db/postgres/repositories/AbstractEntity.repository';
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ListOutPut } from 'src/shared/interfaces/base_interface/listOutPut.interface';
import { UserWallet } from 'src/infrastructure/database/postgres/models/userWallet.model';
import { CreateUserWalletDto } from 'src/domain/dto/userWallet/createUserWallet.dto';
import { ListUserWalletDto } from 'src/domain/dto/userWallet/listUserWallet.dto';
import { EditUserWalletDto } from 'src/domain/dto/userWallet/editUserWallet.dto';

  @Injectable()
export class UserWalletRepository extends AbstractEntityRepository<UserWallet> {
    collectionName: string;
    constructor (public sequelize: Sequelize) {
      super(sequelize.model('UserWallet'));
      this.collectionName = 'user-wallet';
      this.filterTypes = {
        id: 'in',
        userId: 'in',
        isActive: 'equal',
        createdAt: 'range',
      };
    }

    createUserWallet (createUserWalletData: CreateUserWalletDto): Promise<UserWallet> {
      return this.create(createUserWalletData);
    }

    findUserWalletById (id: number): Promise<UserWallet> {
      const criteria = { id };
      return this.findOne(criteria);
    }

    deleteUserWalletById (id: number): Promise<UserWallet> {
      const criteria = { id };
      return this.update({ isActive: false }, criteria);
    }


    editUserWalletById (id: number, modifications: EditUserWalletDto):Promise<UserWallet> {
      const criteria = { id };
      return this.update(modifications, criteria);
    }

    listUserWalletByQuery (query: ListUserWalletDto): Promise<ListOutPut<UserWallet>> {
      const user = this.sequelize.model('User');
      return this.findAndCountAll(query, {
        relation: [ { model: user } ],
      });
    }

    findWalletsByUserId (userId: number): Promise<any> {
      const user = this.sequelize.model('User');
      return this.findAndCountAll(
        { userId },
        { relation: [ { model: user } ] },
      );
    }
}
