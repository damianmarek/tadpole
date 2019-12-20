import { resolveSchema } from '../src/resolveSchema';

describe('resolveSchema', () => {
  it('should return same data', () => {
    const data = { test: 'hello ' };

    expect(resolveSchema(data)).toEqual(data);
  });
});
