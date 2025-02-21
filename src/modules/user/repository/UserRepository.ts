import { User } from '@prisma/client';
import { prisma } from '../../../config/db';
import { IUserRepository } from '../types';
import { SIGNUP_SCHEMA_TYPE } from '../../auth/types';
import { Service } from 'typedi';

@Service()
export class UserRepository implements IUserRepository {

  async findMany(): Promise<User[]> {
    console.log('UserRepository');
    return prisma.user.findMany();
  }

  async findOne(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async createOne(data: SIGNUP_SCHEMA_TYPE): Promise<User> {
    return prisma.user.create({ data });
  }

  async deleteOne(id: number): Promise<User> {
    return prisma.user.delete({ where: { id } });
  }
}
