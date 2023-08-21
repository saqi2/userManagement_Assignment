import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { BaseAbstractDto } from 'src/domain/dto/Base/base.abstract.dto';

export class ListRoleActionDto extends BaseAbstractDto {
  public readonly moduleName = 'role-action'

  @ApiPropertyOptional({ name: 'id', type: [ Number ], format: 'form' })
  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { each: true })
  id: number[];

  @ApiPropertyOptional({ name: 'actionId', type: [ Number ], format: 'form' })
  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { each: true })
  actionId: number[];

  @ApiPropertyOptional({ name: 'roleId', type: [ Number ], format: 'form' })
  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { each: true })
  roleId: number[]

  @IsOptional()
  @IsBooleanString()
  @ApiProperty({
    name: 'isActive',
    type: Boolean,
  })
  isActive: boolean


  @IsOptional()
  @IsBooleanString()
  @ApiProperty({
    name: 'createdAt',
    type: Date,
  })
  createdAt: Date
}
