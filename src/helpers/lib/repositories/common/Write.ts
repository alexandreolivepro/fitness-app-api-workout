import { UpdateWriteOpResult } from 'mongoose';

interface Write<T> {

    create: (item: T) => Promise<T>;

    update: (_id: string, item: T) => Promise<UpdateWriteOpResult>;

    delete: (_id: string, callback: (error: string, result: T) => void) => void;
}

export = Write;
