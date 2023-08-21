import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';
import { BaseAbstractDto } from 'src/domain/dto/Base/base.abstract.dto';

export class CreateRoleActionDto extends BaseAbstractDto {
  public readonly moduleName = 'role-action';

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    type: Number,
    example: 1,
  })
  roleId:number;


  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    type: Number,
    example: 1,
  })
  actionId:number

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isActive: boolean
}
