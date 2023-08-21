import { Injectable } from '@nestjs/common';
import { CreateUserKYCDto } from 'src/domain/dto/userKYC/createUserKYC.dto';
import { UpdateUserKYCDto } from 'src/domain/dto/userKYC/updateUserKYC.dto';
import { UserKYCRepository } from 'src/infrastructure/database/postgres/repositories/userKYC.repository';

@Injectable()
export class UserKYCService {
  constructor (private readonly userKYCRepository: UserKYCRepository) {}

  create (createUserKycDto: CreateUserKYCDto) {
    return this.userKYCRepository.create(createUserKycDto);
  }

  findAll () {
    return this.userKYCRepository.findAll({});
  }

  findOne (id: number) {
    return this.userKYCRepository.findOneById(id);
  }

  update (id: number, updateUserKycDto: UpdateUserKYCDto) {
    return this.userKYCRepository.updateOneById(id, updateUserKycDto);
  }

  remove (id: number) {
    return this.userKYCRepository.updateOneById(id, { isActive: false });
  }
}
