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

  it('should return data with resolved deeply nested function', () => {
    const data = {
      firstName: 'Damian',
      lastName: 'Marek',
      nested1: {
        address: {
          city: 'Warsaw',
          country: 'Poland',
        },
      },
    }

    const schema = {
      fullName: ({ firstName, lastName }) => `${firstName} ${lastName}`,
      nested1: {
        address: {
          fullAddress: ({ city, country }) => `${city}, ${country}`,
        },
      },
    }

    const resolvedData = resolveSchema(schema, data)

    expect(resolvedData).toEqual({
      firstName: 'Damian',
      lastName: 'Marek',
      fullName: 'Damian Marek',
      nested1: {
        address: {
          city: 'Warsaw',
          country: 'Poland',
          fullAddress: 'Warsaw, Poland',
        },
      },
    })
  })

  it('should return data with resolved function in array', () => {
    const data = [
      {
        firstName: 'Damian',
        lastName: 'Marek',
      },
      {
        firstName: 'Alan',
        lastName: 'Turing',
      },
    ]

    const PersonSchema = {
      fullName: ({ firstName, lastName }) => `${firstName} ${lastName}`,
    }

    const schema = [PersonSchema]

    const resolvedData = resolveSchema(schema, data)

    expect(resolvedData).toEqual([
      {
        firstName: 'Damian',
        lastName: 'Marek',
        fullName: 'Damian Marek',
      },
      {
        firstName: 'Alan',
        lastName: 'Turing',
        fullName: 'Alan Turing',
      },
    ])
  })

  it('should return data with resolved function in nested array', () => {
    const data = {
      persons: [
        {
          firstName: 'Damian',
          lastName: 'Marek',
        },
        {
          firstName: 'Alan',
          lastName: 'Turing',
        },
      ],
    }

    const PersonSchema = {
      fullName: ({ firstName, lastName }) => `${firstName} ${lastName}`,
    }

    const schema = {
      persons: [PersonSchema],
    }

    const resolvedData = resolveSchema(schema, data)

    expect(resolvedData).toEqual({
      persons: [
        {
          firstName: 'Damian',
          lastName: 'Marek',
          fullName: 'Damian Marek',
        },
        {
          firstName: 'Alan',
          lastName: 'Turing',
          fullName: 'Alan Turing',
        },
      ],
    })
  })
})
