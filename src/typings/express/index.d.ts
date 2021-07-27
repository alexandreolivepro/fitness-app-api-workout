// declare module "express-swagger-generator";
import OAuthServer from 'express-oauth-server';

declare module 'express-serve-static-core' {
    export interface Express {
        oauth: OAuthServer;
    }

    export interface Filters {
        [x: string]: string[];
    }

    export interface Sort {
        [x: string]: number;
    }

    export interface Pagination {
        index: number;
        limite?: number | string;
    }

    export interface WorkoutsModule {
        count?: number;
        match?: unknown;
    }

    export interface ExercicesModule {
        count?: number;
        match?: unknown;
    }

    export interface Request {
        workouts?: WorkoutsModule;
        exercices: ExercicesModule;
    }
}
