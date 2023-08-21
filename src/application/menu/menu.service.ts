import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from 'src/domain/dto/menu/createMenu.dto';
import { EditMenuDto } from 'src/domain/dto/menu/editMenu.dto';
import { ListMenuDto } from 'src/domain/dto/menu/listMenu.dto';
import { Menu } from 'src/infrastructure/database/postgres/models/menu.model';
import { MenuRepository } from 'src/infrastructure/database/postgres/repositories/menu.repository';
import { ListOutPut } from 'src/shared/interfaces/base_interface/listOutPut.interface';

@Injectable()
export class MenuService {
  constructor (private readonly menuRepository : MenuRepository) {}


  create (createMenuData: CreateMenuDto): Promise<Menu> {
    return this.menuRepository.createMenu(createMenuData);
  }

  getAll (query: ListMenuDto):Promise<ListOutPut<any>> {
    return this.menuRepository.listMenuByQuery(query);
  }

  edit (id: number, modifications: EditMenuDto): Promise<Menu> {
    return this.menuRepository.editMenuById(id, modifications);
  }
}
