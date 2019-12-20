import _ from 'lodash'

export const resolveSchema = (schema, data, propertyData) => {
  if (typeof schema === 'function') {
    return schema(data)
  }

  if (typeof data === 'object') {
    const resolveData = propertyData || data

    const resolvedSchema = _.reduce(
      schema,
      (acc, propertySchema, propertyName) => ({
        ...acc,
        [propertyName]: resolveSchema(propertySchema, resolveData, data[propertyName]),
      }),
      {},
    )

    return _.merge(resolvedSchema, data)
  }

  return data
}
