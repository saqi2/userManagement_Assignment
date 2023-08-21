import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleService } from 'src/application/role/role.service';
import { CreateRoleDto } from 'src/domain/dto/role/createRole.dto';
import { EditRoleDto } from 'src/domain/dto/role/editRole.dto';
import { Role } from 'src/infrastructure/database/postgres/models/role.model';
import { ResponseSerialization } from 'src/shared/middlewares/responseSerialization.interceptor';
import { JwtAuthGuard } from 'src/shared/passport/jwt-auth.guard';
import { ListRoleDto } from 'src/domain/dto/role/listRole.dto';
import { NewRequest } from 'src/shared/interfaces/base_interface/NewRequest.interface';

@ApiTags('Role')
@ApiBearerAuth()
@UseInterceptors(new ResponseSerialization([ '_', 'updatedBy', 'createdBy' ]))
@Controller('role')
export class RoleController {
  constructor (private readonly roleService: RoleService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  post (@Body() CreateRoleData: CreateRoleDto): Promise<Role> {
    return this.roleService.create(CreateRoleData);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(':roleId')
  patch (
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body() roleData: EditRoleDto,
  ): Promise<Role> {
    return this.roleService.edit(roleId, roleData);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':roleId')
  delete (@Param('roleId', ParseIntPipe) roleId: number): Promise<Role> {
    return this.roleService.delete(roleId);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':roleId')
  get (@Param('roleId', ParseIntPipe) roleId: number, @Req() req: NewRequest) {
    return req.dataFromMiddleware;
  }

  @Get()
  @ApiImplicitQuery({
    name: 'id',
    type: Array,
    description: 'id of roles',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'title',
    type: String,
    description: 'title of roles',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'searchTitle',
    type: String,
    description: 'search title of post',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'isActive',
    type: Boolean,
    description: 'isActive of post',
    required: false,
  })
  @ApiOperation({ summary: 'Get All Roles' })
  @ApiResponse({ status: 200, description: 'Successfully get all roles' })
  @ApiResponse({ status: 404, description: 'role not found' })
  async getAll (@Query() query: ListRoleDto): Promise<{rows: Role[], count: number}> {
    const { count, rows } = await this.roleService.getAll(query);

    return { count, rows };
  }
}
