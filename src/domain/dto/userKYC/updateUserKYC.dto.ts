import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsBoolean } from 'class-validator';
import { CreateUserKYCDto } from 'src/domain/dto/userKYC/createUserKYC.dto';

export class UpdateUserKYCDto extends PartialType(CreateUserKYCDto) {
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isActive: boolean;
}
