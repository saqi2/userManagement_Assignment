import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { BaseAbstractDto } from 'src/domain/dto/Base/base.abstract.dto';

export class CreateActionDto extends BaseAbstractDto {
  public readonly moduleName = 'action';


  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  @ApiProperty({
    type: String,
    example: '/auth/register',
  })
  completePath: string;


  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    type: Number,
    example: 1,
  })
  minimumKYCLevel: number

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    type: Number,
    example: 1,
  })
  menuId: number

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
  actionTypeId: number
}
