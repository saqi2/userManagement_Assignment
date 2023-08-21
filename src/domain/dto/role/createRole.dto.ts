import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { BaseAbstractDto } from 'src/domain/dto/Base/base.abstract.dto';

export class CreateRoleDto extends BaseAbstractDto {
  public readonly moduleName = 'role';

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @ApiProperty({
    type: String,
    example: 'superAdmin',
  })
  title: string;
}
