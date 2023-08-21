import { Test, TestingModule } from '@nestjs/testing';
import { RoleActionController } from './role-action.controller';

describe('RoleActionController', () => {
  let controller: RoleActionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ RoleActionController ],
    }).compile();

    controller = module.get<RoleActionController>(RoleActionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
