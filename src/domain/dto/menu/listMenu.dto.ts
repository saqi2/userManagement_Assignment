import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { BaseAbstractDto } from 'src/domain/dto/Base/base.abstract.dto';

export class ListMenuDto extends BaseAbstractDto {
  public readonly moduleName = 'menu'

  @ApiPropertyOptional({ name: 'id', type: [ Number ], format: 'form' })
  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { each: true })
  id: number[];

  @ApiPropertyOptional({ name: 'parentId', type: [ Number ], format: 'form' })
  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { each: true })
  parentId: number

  @ApiPropertyOptional({ name: 'showPriority', type: Number, format: 'form' })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  showPriority: number


  @IsOptional()
  @IsBooleanString()
  @ApiProperty({
    type: Boolean,
  })
  isActive: boolean
}
