import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { BaseAbstractDto } from 'src/domain/dto/Base/base.abstract.dto';

export class EditActionDto extends BaseAbstractDto {
  public readonly moduleName= 'action';

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty({
    type: String,
    example: '',
  })
  completePath: string;


  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    type: Number,
    example: 1,
  })
  minimumKYCLevel: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isActive: boolean;
}
