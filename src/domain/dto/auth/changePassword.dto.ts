import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, IsEmail, MaxLength } from 'class-validator';
import { BaseAbstractDto } from 'src/domain/dto/Base/base.abstract.dto';


export class ChangePasswordDto extends BaseAbstractDto {
  public readonly moduleName = 'user'
  @IsNotEmpty()
  @IsString()
  @Length(8, 50)
  @ApiProperty({
    type: String,
    example: 'BOOazar!2021',
  })
  password: string;

  @IsString()
  @Length(8, 50)
  @ApiProperty({
    type: String,
    example: 'BOOazar!2021',
  })
  confirmPassword: string;


  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 654789,
  })
  verificationCode: number;


  @IsNotEmpty()
  @IsEmail()
  @MaxLength(70)
  @ApiProperty({
    type: String,
    example: 'JohnDoe@Yahoo.com',
  })
  email: string;


  @IsOptional()
  @Length(8, 15)
  @ApiProperty({
    type: String,
    example: '+989120322784',
  })
  // TODO  create regex validation in src/config/regex
  cellPhone: string;
}
