import { Test, TestingModule } from '@nestjs/testing';
import { UtilsService } from './utils.service';
import { beforeEach, describe, expect, it } from 'vitest';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsService],
    }).compile();

    service = module.get<UtilsService>(UtilsService);
  });

  it('[Util] generateAllowOrigins', () => {
    expect(service).toBeDefined();
  });
});
