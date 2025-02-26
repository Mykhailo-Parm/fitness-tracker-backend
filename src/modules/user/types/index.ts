import { User } from '@prisma/client';
import { HttpError } from 'http-errors';
import { SIGNUP_SCHEMA_TYPE } from '../../auth/types';
import { Service } from 'typedi';
import { z } from 'zod';

interface IUserRepository {
  findMany: () => Promise<User[]>;
  findOne: (id: number) => Promise<User | null>;
  createOne: (data: SIGNUP_SCHEMA_TYPE) => Promise<User>;
  deleteOne: (id: number) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
  updateOne: (id: number, data: Partial<User>) => Promise<User>
}

const UPDATE_USER_SCHEMA = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().email('Invalid email').optional(),
});

export { IUserRepository, UPDATE_USER_SCHEMA };
export type UPDATE_USER_SCHEMA_TYPE = z.infer<typeof UPDATE_USER_SCHEMA>;
