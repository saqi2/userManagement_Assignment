import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UpdateUserKYCDto } from 'src/domain/dto/userKYC/updateUserKYC.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserKYCService } from 'src/application/userKYC/useKYC.service';
import { CreateUserKYCDto } from 'src/domain/dto/userKYC/createUserKYC.dto';

@ApiTags('UserKYC')
@ApiBearerAuth()
@Controller('user-kyc')
export class UserKYCController {
  constructor (private readonly userKycService: UserKYCService) {}

  @Post()
  @ApiOperation({ summary: 'create a userKYC' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create (@Body() createUserKycDto: CreateUserKYCDto) {
    return this.userKycService.create(createUserKycDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all userKYCs' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'menu not found' })
  findAll () {
    return this.userKycService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get a userKYC by id' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'menu not found' })
  findOne (@Param('id', ParseIntPipe) id: number) {
    return this.userKycService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update a userKYC by id' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'menu not found' })
  update (@Param('id', ParseIntPipe) id: number, @Body() updateUserKycDto: UpdateUserKYCDto) {
    return this.userKycService.update(id, updateUserKycDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'removes an userKYC by id' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'menu not found' })
  remove (@Param('id', ParseIntPipe) id: number) {
    return this.userKycService.remove(id);
  }
}
