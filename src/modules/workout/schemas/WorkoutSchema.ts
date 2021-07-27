import { Schema, Types, ObjectId } from 'mongoose';

import DataAccess from '../../../helpers/lib/dataAccess/DataAccess';
import CategorySchema from './CategorySchema';
import WorkoutMuscle from '../interfaces/WorkoutMuscle';
import { WorkoutModel } from '../models/WorkoutModel';
import WorkoutExerciceSchema from './WorkoutExerciceSchema';

// const mongoose = DataAccess.mongooseInstance;
const { mongooseConnection } = DataAccess;

class WorkoutSchema {
  get schema(): Schema<WorkoutModel> {
    return new Schema({
      name: {
        type: String,
        required: true,
      },
      category: {
        type: Types.ObjectId,
        required: true,
      },
      userId: {
        type: Types.ObjectId,
        required: true,
      },
      exercices: [WorkoutExerciceSchema.schema],
      musclesGroup: {
        type: 'array',
        items: {
          type: String,
        },
        required: false,
      },
      friendsList: {
        type: 'array',
        items: {
          type: Types.ObjectId,
        },
        required: false,
      },
      duration: {
        type: Number,
        required: false,
      },
      pause: {
        type: Number,
        required: false,
      },
      videos: {
        type: 'array',
        items: {
          type: String,
        },
        required: false,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
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

const schema = mongooseConnection.model<WorkoutModel>(
  'Workouts',
  new WorkoutSchema().schema,
);
export = schema;
