import { describe, expect, it } from 'vitest';
import { getEnvValueAs } from './getEnvValueAs';

describe('getEvenValueAs 유틸함수 테스트', () => {
  it('불리언 값 테스트', () => {
    const value = getEnvValueAs(Boolean, 'LOG_SAVE');
    expect(typeof value).toBe('boolean');
  });
});
