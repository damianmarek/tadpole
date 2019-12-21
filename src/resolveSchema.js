import _ from 'lodash'

export const resolveSchema = (schema, data, passedPropertyData, passedPropertySchema) => {
  if (typeof schema === 'function') {
    return schema(data)
  }

  const objectData = passedPropertyData || data
  const objectSchema = passedPropertySchema || schema

  if (Array.isArray(objectData)) {
    return objectData.map(element => resolveSchema(objectSchema[0], element))
  }

  if (typeof data === 'object') {
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
