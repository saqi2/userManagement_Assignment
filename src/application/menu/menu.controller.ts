import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { MenuService } from 'src/application/menu/menu.service';
import { CreateMenuDto } from 'src/domain/dto/menu/createMenu.dto';
import { EditMenuDto } from 'src/domain/dto/menu/editMenu.dto';
import { ListMenuDto } from 'src/domain/dto/menu/listMenu.dto';
import { Menu } from 'src/infrastructure/database/postgres/models/menu.model';
import { NewRequest } from 'src/shared/interfaces/base_interface/NewRequest.interface';
import { ResponseSerialization } from 'src/shared/middlewares/responseSerialization.interceptor';
@ApiTags('Menu')
@ApiBearerAuth()
@UseInterceptors(new ResponseSerialization([ '_', 'updatedBy', 'createdBy' ]))
@Controller('menu')
export class MenuController {
  constructor (private readonly menuService: MenuService) {}


  @Post()
  @ApiOperation({ summary: 'Create menu' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  post (@Body() CreateMenuData: CreateMenuDto): Promise<Menu> {
    return this.menuService.create(CreateMenuData);
  }


  @Get(':menuId')
  @ApiOperation({ summary: 'get a menu by id' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'menu not found' })
  get (@Param('menuId', ParseIntPipe) menuId: number, @Req() req: NewRequest) {
    return req.dataFromMiddleware;
  }


  @Get()
  @ApiImplicitQuery({
    name: 'id',
    type: Array,
    description: 'id of menus',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'parentId',
    type: Array,
    description: 'parentId of menus',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'showPriority',
    type: Array,
    description: 'showPriority of menu',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'isActive',
    type: Boolean,
    description: 'isActive of menus',
    required: false,
  })
  @ApiOperation({ summary: 'Get All menus' })
  @ApiResponse({ status: 200, description: 'Successfully get all menus' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async getAll (@Query() query: ListMenuDto): Promise<{rows: Menu[], count: number}> {
    const { count, rows } = await this.menuService.getAll(query);

    return { count, rows };
  }

  @Patch(':menuId')
  @ApiOperation({ summary: 'Update menu' })
  @ApiResponse({ status: 201, description: 'Successfully Update menu' })
  @ApiResponse({ status: 404, description: 'menu not found' })
  patch (
    @Param('menuId', ParseIntPipe) menuId: number,
    @Body() updateData: EditMenuDto,
  ):Promise<Menu> {
    return this.menuService.edit(menuId, updateData);
  }
}
