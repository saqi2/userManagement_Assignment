import { Test, TestingModule } from '@nestjs/testing';
import { RoleActionService } from './role-action.service';

describe('RoleActionService', () => {
  let service: RoleActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ RoleActionService ],
    }).compile();

    service = module.get<RoleActionService>(RoleActionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
