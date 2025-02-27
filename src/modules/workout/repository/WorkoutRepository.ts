import { PrismaClient, Workout } from '@prisma/client';
import { CREATE_WORKOUT_SCHEMA_TYPE, IWorkoutRepository } from '../types';
import { CREATE_EXERCISE_SCHEMA } from '@src/modules/exercise/types';
import { ApiError } from '@src/utils/ApiError';

export class WorkoutRepository implements IWorkoutRepository {
  private prisma: PrismaClient;

  constructor({ prisma }: { prisma: PrismaClient }) {
    this.prisma = prisma;
  }

  async findMany(userId: number): Promise<Workout[]> {
    return this.prisma.workout.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: number): Promise<Workout | null> {
    return this.prisma.workout.findUnique({
      where: { id },
      include: { workoutLogs: true },
    });
  }

  async createOne(data: CREATE_WORKOUT_SCHEMA_TYPE): Promise<Workout> {
    return this.prisma.workout.create({ data });
  }

  async deleteOne(id: number): Promise<Workout> {
    return this.prisma.workout.delete({ where: { id } });
  }
}
