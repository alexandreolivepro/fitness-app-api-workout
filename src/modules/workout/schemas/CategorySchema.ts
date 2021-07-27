import { Schema, Types, ObjectId } from 'mongoose';

import DataAccess from '../../../helpers/lib/dataAccess/DataAccess';
import CategoryModel from '../models/CategoryModel';

// const mongoose = DataAccess.mongooseInstance;
const { mongooseConnection } = DataAccess;

class CategorySchema {
  get schema(): Schema<CategoryModel> {
    return new Schema({
      name: {
        type: String,
        required: true,
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

const schema = mongooseConnection.model<CategoryModel>(
  'WorkoutCategories',
  new CategorySchema().schema,
);
export = schema;
