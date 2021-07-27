const createUsersValidator = {
  properties: {
    name: {
      type: 'string',
      maxLength: 128,
    },
    tutorialVideo: {
      type: 'string',
    },
    relatedExercice: {
      type: 'array',
    },
    musclesGroup: {
      type: 'array',
      minItems: 0,
      items: {
        type: 'string',
      },
    },
    equipmentNeeded: {
      type: 'array',
      minItems: 0,
      items: {
        type: 'string',
      },
    },
  },
  required: ['name'],
};

export = createUsersValidator;
