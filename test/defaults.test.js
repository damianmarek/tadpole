import { resolveSchema } from '../src/resolveSchema'

describe('defaults', () => {
  it('should return empty array for schema containing array and missing data', () => {
    const schema = {
      entries: [],
    }

    const data = {
      name: 'testData',
    }

    const expectedResult = {
      entries: [],
      name: 'testData',
    }

    expect(resolveSchema(schema, data)).toEqual(expectedResult)
  })

  it('should return empty array for schema containing root array and missing root data', () => {
    const schema = []

    const data = undefined

    const expectedResult = []

    expect(resolveSchema(schema, data)).toEqual(expectedResult)
  })


  it('should return empty object for schema containing object and missing data', () => {
    const schema = {
      entries: {},
    }

    const data = {
      name: 'testData',
    }

    const expectedResult = {
      entries: {},
      name: 'testData',
    }

    expect(resolveSchema(schema, data)).toEqual(expectedResult)
  })

  it('should return empty object for schema containing root object and missing root data', () => {
    const schema = {
    }

    const data = undefined

    const expectedResult = {}

    expect(resolveSchema(schema, data)).toEqual(expectedResult)
  })

  it('should return default string for schema containing object', () => {
    const schema = {
      defaultString: 'lala',
    }

    const data = {
      someData: 'data',
    }

    const expectedResult = {
      defaultString: 'lala',
      someData: 'data',
    }

    expect(resolveSchema(schema, data)).toEqual(expectedResult)
  })

  it('should return default string for schema containing nested object', () => {
    const schema = {
      someObject: {
        defaultString: 'lala',
      },
    }

    const data = {
      someData: 'data',
      someObject: {
        someNestedData: 'nestedData',
      },
    }

    const expectedResult = {
      someData: 'data',
      someObject: {
        defaultString: 'lala',
        someNestedData: 'nestedData',
      },
    }

    expect(resolveSchema(schema, data)).toEqual(expectedResult)
  })
})
