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
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { Action } from 'src/infrastructure/database/postgres/models/action.model';
import { ActionService } from 'src/application/action/action.service';
import { CreateActionDto } from 'src/domain/dto/action/createAction.dto';
import { NewRequest } from 'src/shared/interfaces/base_interface/NewRequest.interface';
import { ListActionDto } from 'src/domain/dto/action/listAction.dto';
import { EditActionDto } from 'src/domain/dto/action/editAction.dto';
import { ResponseSerialization } from 'src/shared/middlewares/responseSerialization.interceptor';

@ApiTags('Action')
@UseInterceptors(new ResponseSerialization(['_', 'updatedBy', 'createdBy']))
@ApiBearerAuth()
@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Post()
  @ApiOperation({ summary: 'Create action' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  post(@Body() createActionData: CreateActionDto): Promise<Action> {
    return this.actionService.create(createActionData);
  }

  @Get(':actionId')
  @ApiOperation({ summary: 'get a action by id' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'action not found' })
  get(
    @Param('actionId', ParseIntPipe) actionId: number,
    @Req() req: NewRequest,
  ) {
    return req.dataFromMiddleware;
  }

  @Get()
  @ApiImplicitQuery({
    name: 'id',
    type: Array,
    description: 'id of actions',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'menuId',
    type: Array,
    description: 'menuId of actions',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'minimumKYCLevel',
    type: Number,
    description: 'minimumKYCLevel of actions',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'createdAt',
    type: Date,
    description: 'Date of actions',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'isActive',
    type: Boolean,
    description: 'isActive of action',
    required: false,
  })
  @ApiOperation({ summary: 'Get All actions' })
  @ApiResponse({ status: 200, description: 'Successfully get all actions' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async getAll(
    @Query() query: ListActionDto,
  ): Promise<{ rows: Action[]; count: number }> {
    const { count, rows } = await this.actionService.getAll(query);

    return { count, rows };
  }

  @Delete(':actionId')
  @ApiOperation({ summary: 'delete a action by id' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'action not found' })
  delete(@Param('actionId', ParseIntPipe) actionId: number): Promise<Action> {
    return this.actionService.delete(actionId);
  }

  @Patch(':actionId')
  @ApiOperation({ summary: 'Update action' })
  @ApiResponse({ status: 201, description: 'Successfully Update action' })
  @ApiResponse({ status: 404, description: 'action not found' })
  patch(
    @Param('actionId', ParseIntPipe) actionId: number,
    @Body() updateData: EditActionDto,
  ): Promise<Action> {
    return this.actionService.edit(actionId, updateData);
  }
}
