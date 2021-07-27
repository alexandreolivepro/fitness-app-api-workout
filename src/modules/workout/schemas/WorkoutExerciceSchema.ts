import { Schema, Types } from 'mongoose';
import WorkoutExercice from '../interfaces/WorkoutExercice';

class WorkoutExerciceSchema {
  static get schema(): Schema<WorkoutExercice> {
    return new Schema({
      exerciceId: {
        type: Types.ObjectId,
        required: true,
      },
      repetition: {
        type: Number,
        required: false,
      },
      weight: {
        type: Number,
        required: false,
      },
      duration: {
        type: Number,
        required: false,
      },
    });
  }
}

export = WorkoutExerciceSchema;
