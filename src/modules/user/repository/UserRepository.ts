import { PrismaClient, User } from '@prisma/client';
import { IUserRepository } from '../types';
import { SIGNUP_SCHEMA_TYPE } from '../../auth/types';
import { ApiError } from '@src/utils/ApiError';

export class UserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor({ prisma }: { prisma: PrismaClient }) {
    this.prisma = prisma;
  }

  async findMany(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async createOne(data: SIGNUP_SCHEMA_TYPE): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  async deleteOne(id: number): Promise<User> {
    return await this.prisma.user.delete({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async updateOne(id: number, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }
}
