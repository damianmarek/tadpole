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

  it('should return data with resolved one level nested function', () => {
    const data = {
      firstName: 'Damian',
      lastName: 'Marek',
      address: {
        city: 'Warsaw',
        country: 'Poland',
      },
    }

    const schema = {
      fullName: ({ firstName, lastName }) => `${firstName} ${lastName}`,
      address: {
        fullAddress: ({ city, country }) => `${city}, ${country}`,
      },
    }

    const resolvedData = resolveSchema(schema, data)

    expect(resolvedData).toEqual({
      firstName: 'Damian',
      lastName: 'Marek',
      fullName: 'Damian Marek',
      address: {
        city: 'Warsaw',
        country: 'Poland',
        fullAddress: 'Warsaw, Poland',
      },
    })
  })
})
