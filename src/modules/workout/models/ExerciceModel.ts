import { Document, ObjectId } from 'mongoose';

export interface Exercice {
    name: string;
    tutorialVideo?: string;
    relatedExercice?: ObjectId[];
    musclesGroup?: string[];
    equipmentNeeded: string[];
}

export interface ExerciceModel extends Exercice, Document {

}

export default ExerciceModel;
