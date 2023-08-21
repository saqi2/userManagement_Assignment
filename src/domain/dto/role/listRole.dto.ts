import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsBooleanString,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { BaseAbstractDto } from 'src/domain/dto/Base/base.abstract.dto';

export class ListRoleDto extends BaseAbstractDto {
  public readonly moduleName= 'role';

  @ApiPropertyOptional({ name: 'id', type: [ Number ], format: 'form' })
  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { each: true })
  id: number[];

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty({
    type: String,
  })
  title: string

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty({
    type: String,
  })
  searchTitle: string


  @IsOptional()
  @IsBooleanString()
  @ApiProperty({
    type: Boolean,
  })
  isActive: boolean
}
