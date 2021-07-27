import { Document, ObjectId } from 'mongoose';
import WorkoutCategoryEnum from '../enum/WorkoutCategory';

export interface Category {
    createdAt?: Date;
    updatedAt?: Date;
    name: WorkoutCategoryEnum;
}

export interface CategoryModel extends Category, Document {

}

export default CategoryModel;
