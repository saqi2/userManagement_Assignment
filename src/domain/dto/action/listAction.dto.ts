import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { BaseAbstractDto } from 'src/domain/dto/Base/base.abstract.dto';

export class ListActionDto extends BaseAbstractDto {
  public readonly moduleName = 'action'

  @ApiPropertyOptional({ name: 'id', type: [ Number ], format: 'form' })
  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { each: true })
  id: number[];

  @ApiPropertyOptional({ name: 'menuId', type: [ Number ], format: 'form' })
  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { each: true })
  menuId: number[];

  @ApiPropertyOptional({ name: 'minimumKYCLevel', type: Number, format: 'form' })
  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { each: true })
  minimumKYCLevel: number;


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
