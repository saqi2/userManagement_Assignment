import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { BaseAbstractDto } from 'src/domain/dto/Base/base.abstract.dto';

export class EditUserWalletDto extends BaseAbstractDto {
  public readonly moduleName= 'user-wallet';


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
  userId: number;
}
