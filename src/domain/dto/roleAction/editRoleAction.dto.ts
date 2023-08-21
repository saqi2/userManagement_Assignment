import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { BaseAbstractDto } from 'src/domain/dto/Base/base.abstract.dto';

export class EditRoleActionDto extends BaseAbstractDto {
  public readonly moduleName= 'role-action';


  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isActive: boolean;


  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    type: Number,
    example: 1,
  })
  actionId: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    type: Number,
    example: 1,
  })
  roleId: number;
}
