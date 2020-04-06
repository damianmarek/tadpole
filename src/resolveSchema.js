import _ from 'lodash'

export const handleDefaults = () => {

}

export const resolveSchema = (
  schema,
  data,
  passedPropertyName,
) => {
  const objectSchema = _.get(schema, [passedPropertyName], schema)
  const objectData = _.get(data, [passedPropertyName], data)

  // detects if provided schema is a function
  if (typeof objectSchema === 'function') {
    // execute provided function schema
    return objectSchema(objectData)
  }

  if (Array.isArray(objectSchema) && !objectData) {
    return []
  }

  if (typeof objectSchema === 'object' && !objectData) {
    return {}
  }

  if (_.isString(objectSchema) || _.isBoolean(objectSchema) || _.isNumber(objectSchema)) {
    return objectSchema
  }


  // hande array data
  if (Array.isArray(objectData)) {
    const items = objectData.map(element => resolveSchema(objectSchema[0], element))

    const enhanceFunctionKeys = _.filter(_.keys(objectSchema), item => item !== '0')

    const resolvedFunctions = _.reduce(enhanceFunctionKeys, (acc, functionKey) => ({
      ...acc,
      [functionKey]: _.isFunction(objectSchema[functionKey]) && objectSchema[functionKey](items),
    }), {})


    const mergedItems = _.merge(items, resolvedFunctions)

    return mergedItems
  }

  if (Array.isArray(objectSchema) && !objectData[passedPropertyName]) {
    const mergedItems = _.merge(objectData, {
      [passedPropertyName]: [],
    })

    return mergedItems
  }


  // handle object data
  if (typeof objectData === 'object') {
    if (_.isEmpty(objectSchema) && passedPropertyName && !objectData[passedPropertyName]) return {}
    const resolvedSchema = _.reduce(
      objectSchema,
      (acc, propertySchema, propertyName) => ({
        ...acc,
        [propertyName]:
          resolveSchema(
            objectSchema,
            objectData,
            propertyName,
          ),
      }),
      {},
    )

    return _.merge(resolvedSchema, objectData)
  }

  return data
}
