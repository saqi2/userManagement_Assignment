import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { BaseAbstractDto } from 'src/domain/dto/Base/base.abstract.dto';

export class ListUserRoleDto extends BaseAbstractDto {
  public readonly moduleName = 'user-rol';

  @ApiPropertyOptional({ name: 'id', type: [ Number ], format: 'form' })
  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { each: true })
  id: number[];

  @ApiPropertyOptional({ name: 'roleId', type: [ Number ], format: 'form' })
  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { each: true })
  roleId: string

  @ApiPropertyOptional({ name: 'userId', type: [ Number ], format: 'form' })
  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { each: true })
  userId: string


  @IsOptional()
  @IsBooleanString()
  @ApiProperty({
    type: Boolean,
  })
  isActive: boolean
}
