import { Schema, Types, ObjectId } from 'mongoose';

import DataAccess from '../../../helpers/lib/dataAccess/DataAccess';
import ExerciceModel from '../models/ExerciceModel';

// const mongoose = DataAccess.mongooseInstance;
const { mongooseConnection } = DataAccess;

class ExerciceSchema {
  get schema(): Schema<ExerciceModel> {
    return new Schema({
      name: {
        type: String,
        required: true,
      },
      tutorialVideo: {
        type: String,
        required: false,
      },
      relatedExercice: {
        type: 'array',
        items: {
          type: Types.ObjectId,
        },
        required: false,
      },
      musclesGroup: {
        type: 'array',
        items: {
          type: String,
        },
        required: false,
      },
      equipmentNeeded: {
        type: 'array',
        items: {
          type: String,
        },
        required: false,
      },
      createdAt: {
        type: Date,
        required: true,
        default: new Date(),
      },
      updatedAt: {
        type: Date,
        required: true,
        default: new Date(),
      },
    });
  }
}

const schema = mongooseConnection.model<ExerciceModel>(
  'WorkoutExercices',
  new ExerciceSchema().schema,
);
export = schema;
