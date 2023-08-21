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

export class EditMenuDto extends BaseAbstractDto {
  public readonly moduleName= 'menu';

  @IsOptional()
  @IsString()
  @MaxLength(200)
  @ApiProperty({
    type: String,
    example: '',
  })
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(400)
  @ApiProperty({
    type: String,
    example: '',
  })
  generalPath: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  showPriority: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isActive: boolean;


  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    type: Number,
    example: 1,
  })
  parentId: number;
}
