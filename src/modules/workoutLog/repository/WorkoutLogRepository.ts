import { PrismaClient, WorkoutLog } from '@prisma/client';
import {
  IWorkoutLogRepository,
  CREATE_WORKOUT_LOG_SCHEMA_TYPE,
} from '../types';

export class WorkoutLogRepository implements IWorkoutLogRepository {
  private prisma: PrismaClient;

  constructor({ prisma }: { prisma: PrismaClient }) {
    this.prisma = prisma;
  }

  async findMany(workoutId: number): Promise<WorkoutLog[]> {
    return this.prisma.workoutLog.findMany({
      where: { workoutId },
      include: { exercise: true },
    });
  }

  async findOne(id: number): Promise<WorkoutLog | null> {
    return this.prisma.workoutLog.findUnique({
      where: { id },
      include: { exercise: true },
    });
  }

  async createOne(data: CREATE_WORKOUT_LOG_SCHEMA_TYPE): Promise<WorkoutLog> {
    return this.prisma.workoutLog.create({ data });
  }

  async deleteOne(id: number): Promise<WorkoutLog> {
    return this.prisma.workoutLog.delete({ where: { id } });
  }
}
