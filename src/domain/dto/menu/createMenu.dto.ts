import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { BaseAbstractDto } from 'src/domain/dto/Base/base.abstract.dto';

export class CreateMenuDto extends BaseAbstractDto {
  public readonly moduleName = 'menu'
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  @ApiProperty({
    type: String,
    example: 'auth',
  })
  title: string;


  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @MaxLength(400)
  @ApiProperty({
    type: String,
    example: 'api/v1/auth',
  })
  generalPath: string

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    type: Number,
    example: 1,
  })
  showPriority: number

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isActive: boolean


  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    type: Number,
    example: 1,
  })
  parentId: number
}
