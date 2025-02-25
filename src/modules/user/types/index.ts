import { User } from '@prisma/client';
import { HttpError } from 'http-errors';
import { SIGNUP_SCHEMA_TYPE } from '../../auth/types';
import { Service } from 'typedi';

export interface IUserRepository {
  findMany: () => Promise<User[]>;
  findOne: (id: number) => Promise<User | null>;
  createOne: (data: SIGNUP_SCHEMA_TYPE) => Promise<User>;
  deleteOne: (id: number) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
}
