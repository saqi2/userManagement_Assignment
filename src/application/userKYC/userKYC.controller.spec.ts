import { Test, TestingModule } from '@nestjs/testing';
import { UserKYCService } from 'src/application/userKYC/useKYC.service';
import { UserKYCController } from 'src/application/userKYC/userKYC.controller';


describe('UserKYCController', () => {
  let controller: UserKYCController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ UserKYCController ],
      providers: [ UserKYCService ],
    }).compile();

    controller = module.get<UserKYCController>(UserKYCController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
