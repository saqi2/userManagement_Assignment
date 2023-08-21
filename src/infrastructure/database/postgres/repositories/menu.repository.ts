import {
  AbstractEntityRepository,
} from 'src/infrastructure/database/base_db/postgres/repositories/AbstractEntity.repository';
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ListOutPut } from 'src/shared/interfaces/base_interface/listOutPut.interface';
import { Menu } from 'src/infrastructure/database/postgres/models/menu.model';
import { CreateMenuDto } from 'src/domain/dto/menu/createMenu.dto';
import { ListMenuDto } from 'src/domain/dto/menu/listMenu.dto';
import { EditMenuDto } from 'src/domain/dto/menu/editMenu.dto';

@Injectable()
export class MenuRepository extends AbstractEntityRepository<Menu> {
  collectionName: string;
  constructor (public sequelize: Sequelize) {
    super(sequelize.model('Menu'));
    this.collectionName = 'menu';
    this.filterTypes = {
      id: 'in',
      parentId: 'in',
      isActive: 'equal',
      showPriority: 'in',
    };
  }

  createMenu (createMenuData: CreateMenuDto): Promise<Menu> {
    return this.create(createMenuData);
  }

  // findMenuById (id: number) : Promise<Menu> {
  //   const criteria = { id };
  //   return this.findOne(criteria);
  // }


  // deleteMenuById (id: number): Promise<Menu> {
  //   const criteria = { id };
  //   return this.update({ isActive: false }, criteria);
  // }


  listMenuByQuery (query: ListMenuDto): Promise<ListOutPut<Menu>> {
    return this.findAndCountAll(query);
  }

  editMenuById (id: number, modifications: EditMenuDto) :Promise<Menu> {
    const criteria = { id };
    return this.update(modifications, criteria);
  }
}
