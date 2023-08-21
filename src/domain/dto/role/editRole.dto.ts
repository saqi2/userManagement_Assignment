import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { BaseAbstractDto } from 'src/domain/dto/Base/base.abstract.dto';

export class EditRoleDto extends BaseAbstractDto {
  public readonly moduleName= 'role';

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @MaxLength(30)
  @ApiProperty({
    type: String,
    example: 'admin',
  })
  title: string;
}
