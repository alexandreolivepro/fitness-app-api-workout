import { Document, ObjectId } from 'mongoose';
import WorkoutExercice from '../interfaces/WorkoutExercice';
import WorkoutMuscle from '../interfaces/WorkoutMuscle';

export interface WorkoutModel extends Document {
    name: string;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
    category: ObjectId;
    startDate: Date;
    endDate?: Date;
    friendsList: ObjectId[];
}

export type BikeWorkoutModel = WorkoutModel

export interface MusculationWorkoutModel extends WorkoutModel {
    exercices: WorkoutExercice[];
    musclesGroup: WorkoutMuscle[];
}

export interface TimedCardioWorkoutModel extends WorkoutModel {
    exercices: WorkoutExercice[];
    duration: number;
    pause: number;
}

export interface YoutubeVideoWorkoutModel extends WorkoutModel {
    videos: string[];
    pause: number;
}

export default WorkoutModel;
