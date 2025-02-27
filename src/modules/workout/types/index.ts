import { Workout } from '@prisma/client';
import { z } from 'zod';

interface IWorkoutRepository {
  findMany(userId: number): Promise<Workout[]>;
  findOne(id: number): Promise<Workout | null>;
  createOne(data: CREATE_WORKOUT_SCHEMA_TYPE): Promise<Workout>;
  deleteOne(id: number): Promise<Workout>;
}

const CREATE_WORKOUT_SCHEMA = z.object({
  userId: z.number(),
});

type CREATE_WORKOUT_SCHEMA_TYPE = z.infer<typeof CREATE_WORKOUT_SCHEMA>;

export { IWorkoutRepository, CREATE_WORKOUT_SCHEMA };
export type { CREATE_WORKOUT_SCHEMA_TYPE };
