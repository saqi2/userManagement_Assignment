import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post,
  Query, Req, UseInterceptors } from '@nestjs/common';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { RoleActionService } from 'src/application/role-action/role-action.service';
import { CreateRoleActionDto } from 'src/domain/dto/roleAction/createRoleAction.dto';
import { EditRoleActionDto } from 'src/domain/dto/roleAction/editRoleAction.dto';
import { ListRoleActionDto } from 'src/domain/dto/roleAction/listRoleAction.dto';
import { RoleAction } from 'src/infrastructure/database/postgres/models/roleAction.model';
import { NewRequest } from 'src/shared/interfaces/base_interface/NewRequest.interface';
import { ResponseSerialization } from 'src/shared/middlewares/responseSerialization.interceptor';


@ApiTags('RoleAction')
@ApiBearerAuth()
@UseInterceptors(new ResponseSerialization([ '_', 'updatedBy', 'createdBy' ]))
@Controller('role-action')
export class RoleActionController {
  constructor (private roleActionService : RoleActionService) {}

  @Post()
  @ApiOperation({ summary: 'assign action to role' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  post (@Body() RoleActionData: CreateRoleActionDto): Promise<RoleAction> {
    return this.roleActionService.addActionToRole(RoleActionData);
  }


  @Get(':roleActionId')
  @ApiOperation({ summary: 'get role action' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'role action not found' })
  get (@Param('roleActionId', ParseIntPipe) roleActionId: number, @Req() req: NewRequest) {
    return req.dataFromMiddleware;
  }

  @Get()
  @ApiImplicitQuery({
    name: 'id',
    type: Array,
    description: 'id of role-action',
    required: false,
  })

  @ApiImplicitQuery({
    name: 'actionId',
    type: Array,
    description: 'actionId of role-action',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'roleId',
    type: Array,
    description: 'roleId of role-action',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'createdAt',
    type: Date,
    description: 'createdAt of role-action',
    required: false,
  })

  @ApiImplicitQuery({
    name: 'isActive',
    type: Boolean,
    description: 'isActive of action',
    required: false,
  })

  @ApiOperation({ summary: 'Get All role-action' })
  @ApiResponse({ status: 200, description: 'Successfully get all role-action' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async getAll (@Query() query: ListRoleActionDto): Promise<{rows: RoleAction[], count: number}> {
    const { count, rows } = await this.roleActionService.getAll(query);

    return { count, rows };
  }

  @Delete(':roleActionId')
  @ApiOperation({ summary: 'delete role action' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'role action not found' })
  delete (@Param('roleActionId', ParseIntPipe) roleActionId: number): Promise<RoleAction> {
    return this.roleActionService.delete(roleActionId);
  }

  @Patch(':roleActionId')
  @ApiOperation({ summary: 'Update role action' })
  @ApiResponse({ status: 201, description: 'Successfully Update role action' })
  @ApiResponse({ status: 404, description: 'role action not found' })
  patch (
    @Param('roleActionId', ParseIntPipe) roleActionId: number,
    @Body() updateData: EditRoleActionDto,
  ):Promise<RoleAction> {
    return this.roleActionService.edit(roleActionId, updateData);
  }
}
