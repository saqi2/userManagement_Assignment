import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MaxLength, Length } from 'class-validator';
import { BaseAbstractDto } from 'src/domain/dto/Base/base.abstract.dto';

export class ForgotPasswordDto extends BaseAbstractDto {
  public readonly moduleName = 'user'

  @IsOptional()
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
