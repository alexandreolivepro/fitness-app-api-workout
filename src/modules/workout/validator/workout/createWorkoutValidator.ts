const createExerciceValidator = {
  properties: {
    name: {
      type: 'string',
    },
    category: {
      type: 'string',
    },
    userId: {
      type: 'string',
    },
    startDate: {
      type: 'string',
      format: 'date-time',
    },
    endDate: {
      type: 'string',
      format: 'date-time',
    },
    friendsList: {
      type: 'array',
      minItems: 0,
      items: {
        type: 'string',
      },
    },
    exercices: {
      type: 'array',
      items: {
        type: 'object',
      },
    },
    musclesGroup: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    duration: {
      type: 'number',
    },
    pause: {
      type: 'number',
    },
    videos: {
      type: 'number',
    },
  },
  required: ['name', 'category', 'startDate'],
};

export = createExerciceValidator;
