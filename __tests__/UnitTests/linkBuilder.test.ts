import { linkBuilder } from 'Shared/Helpers/linkBuilder';
import { describe, expect, test } from 'vitest';

describe('linkBuilder', () => {
  test('should return correct string for Link component', () => {
    expect(linkBuilder(1, 'title', 'test/all')).toBe('/tournament/1');
    expect(linkBuilder(1, 'title', 'test/playmode')).toBe('/playmode/1/title');
    expect(linkBuilder(1, 'title', 'test')).toBe('');
  });
});
