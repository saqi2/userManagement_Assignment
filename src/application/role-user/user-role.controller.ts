import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { UserRoleService } from 'src/application/role-user/user-role.service';
import { CreateUserRoleDto } from 'src/domain/dto/userRole/createUserRole.dto';
import { ListUserRoleDto } from 'src/domain/dto/userRole/listUserRole.dto';
import { UserRole } from 'src/infrastructure/database/postgres/models/userRole.model';
import { NewRequest } from 'src/shared/interfaces/base_interface/NewRequest.interface';
import { ResponseSerialization } from 'src/shared/middlewares/responseSerialization.interceptor';


@ApiTags('UserRole')
@ApiBearerAuth()
@UseInterceptors(new ResponseSerialization([ '_', 'updatedBy', 'createdBy' ]))
@Controller('user-role')
export class UserRoleController {
  constructor (private readonly userRoleService: UserRoleService) {}

  @Post()
  @ApiOperation({ summary: 'assign role to user' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  post (@Body() UserRoleData: CreateUserRoleDto): Promise<UserRole> {
    return this.userRoleService.addRoleToUser(UserRoleData);
  }


  @Get(':userRoleId')
  @ApiOperation({ summary: 'get user role' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'user role not found' })
  get (@Param('userRoleId', ParseIntPipe) userRoleId: number, @Req() req: NewRequest) {
    return req.dataFromMiddleware;
  }

  @Delete(':userRoleId')
  @ApiOperation({ summary: 'delete user role' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'user role not found' })
  delete (@Param('userRoleId', ParseIntPipe) userRoleId: number): Promise<UserRole> {
    return this.userRoleService.delete(userRoleId);
  }


  @Get()
  @ApiImplicitQuery({
    name: 'id',
    type: Array,
    description: 'id of user-role',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'roleId',
    type: Array,
    description: 'roleId of user-role',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'userId',
    type: Array,
    description: 'userId of user-post',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'isActive',
    type: Boolean,
    description: 'isActive of user-post',
    required: false,
  })
  @ApiOperation({ summary: 'Get All user Roles' })
  @ApiResponse({ status: 200, description: 'Successfully get all user roles' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async getAll (@Query() query: ListUserRoleDto): Promise<{rows: UserRole[], count: number}> {
    const { count, rows } = await this.userRoleService.getAll(query);

    return { count, rows };
  }
}
