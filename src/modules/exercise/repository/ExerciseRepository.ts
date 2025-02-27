import { Exercise, PrismaClient } from '@prisma/client';
import { IExerciseRepository } from '../types';

export class ExerciseRepository implements IExerciseRepository {
  private prisma: PrismaClient;

  constructor({ prisma }: { prisma: PrismaClient }) {
    this.prisma = prisma;
  }

  async findMany(): Promise<Exercise[]> {
    return this.prisma.exercise.findMany();
  }

  async findOne(id: number): Promise<Exercise | null> {
    return this.prisma.exercise.findUnique({
      where: { id },
    });
  }
}
