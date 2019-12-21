import _ from 'lodash'

export const resolveSchema = (schema, data, passedPropertyData, passedPropertySchema) => {
  if (typeof schema === 'function') {
    return schema(data)
  }

  const objectData = passedPropertyData || data
  const objectSchema = passedPropertySchema || schema

  if (Array.isArray(objectData)) {
    const items = objectData.map(element => resolveSchema(objectSchema[0], element))

    const enhanceFunctionKeys = _.filter(_.keys(objectSchema), item => item !== '0')

    const resolvedFunctions = _.reduce(enhanceFunctionKeys, (acc, functionKey) => ({
      ...acc,
      [functionKey]: objectSchema[functionKey](items),
    }), {})

    const mergedItems = _.merge(items, resolvedFunctions)

    return mergedItems
  }

  if (typeof objectData === 'object') {
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
