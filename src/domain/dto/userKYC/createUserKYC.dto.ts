import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUrl, Min } from 'class-validator';
import { BaseAbstractDto } from 'src/domain/dto/Base/base.abstract.dto';

export class CreateUserKYCDto extends BaseAbstractDto {
  public readonly moduleName = 'userKYC';
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    type: Number,
    example: 1,
  })
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    type: Number,
    example: 1,
  })
  serviceId: number;

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    type: String,
    format: 'url',
    required: false,
  })
  documentPath: string;
}
