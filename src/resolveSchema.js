import _ from 'lodash'

export const resolveSchema = (schema, data, passedPropertyData, passedPropertySchema) => {
  if (typeof schema === 'function') {
    return schema(data)
  }

  if (typeof data === 'object') {
    const objectData = passedPropertyData || data
    const objectSchema = passedPropertySchema || schema

    const resolvedSchema = _.reduce(
      objectSchema,
      (acc, propertySchema, propertyName) => ({
        ...acc,
        [propertyName]:
          resolveSchema(
            propertySchema,
            objectData,
            objectData[propertyName],
            propertySchema[propertyName],
          ),
      }),
      {},
    )

    return _.merge(resolvedSchema, objectData)
  }

  return data
}
