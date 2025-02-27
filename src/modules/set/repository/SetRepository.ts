import { PrismaClient, Set } from '@prisma/client';
import { CREATE_SET_SCHEMA_TYPE, ISetRepository } from '../types';

export class SetRepository implements ISetRepository {
  private prisma: PrismaClient;

  constructor({ prisma }: { prisma: PrismaClient }) {
    this.prisma = prisma;
  }

  async findMany(workoutLogId: number): Promise<Set[]> {
    return this.prisma.set.findMany({
      where: { workoutLogId },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number): Promise<Set | null> {
    return this.prisma.set.findUnique({
      where: { id },
    });
  }

  async createOne(data: CREATE_SET_SCHEMA_TYPE): Promise<Set> {
    return this.prisma.set.create({ data });
  }

  async deleteOne(id: number): Promise<Set> {
    return this.prisma.set.delete({ where: { id } });
  }
}
