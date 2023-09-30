export const findSurveyResultSchema = {
  type: 'object',
  properties: {
    _id: {
      type: 'string'
    },
    answer: {
      type: 'string'
    },
    percentage: {
      type: 'string'
    },
    count: {
      type: 'number'
    }
  }
}
