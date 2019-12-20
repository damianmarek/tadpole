import { resolveSchema } from '../src/resolveSchema'

describe('resolveSchema', () => {
  it('should return data with resolved function', () => {
    const data = {
      firstName: 'Damian',
      lastName: 'Marek',
    }

    const schema = {
      fullName: ({ firstName, lastName }) => `${firstName} ${lastName}`,
    }

    const resolvedData = resolveSchema(schema, data)

    expect(resolvedData).toEqual({
      firstName: 'Damian',
      lastName: 'Marek',
      fullName: 'Damian Marek',
    })
  })
})
