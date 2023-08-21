import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { BaseAbstractDto } from 'src/domain/dto/Base/base.abstract.dto';

export class RegisterDto extends BaseAbstractDto {
  public readonly moduleName = 'user'

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(70)
  @ApiProperty({
    type: String,
    example: 'JohnDoe@Yahoo.com',
  })
  email: string;

  @IsNotEmpty()
  @Length(8, 15)
  @ApiProperty({
    type: String,
    example: '+989120322784',
  })
  // TODO  create regex validation in src/config/regex
  cellPhone: string;

  @IsString()
  @Length(8, 50)
  @ApiProperty({
    type: String,
    example: 'BOOazar!2021',
  })
  password: string;
}
