import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Length,
} from 'class-validator';
import { BaseAbstractDto } from 'src/domain/dto/Base/base.abstract.dto';

export class LoginDto extends BaseAbstractDto {
  public readonly moduleName = 'user'

  @IsString()
  @Length(8, 70)
  @ApiProperty({
    type: String,
    example: 'JohnDoe@Yahoo.com',
    description: 'this is email or cellphone',
  })
  username: string;

  @IsString()
  @Length(8, 50)
  @ApiProperty({
    type: String,
    example: 'BOOazar!2021',
  })
  password: string;
}
