import { WorkoutLog } from '@prisma/client';
import { z } from 'zod';

interface IWorkoutLogRepository {
  findMany(workoutId: number): Promise<WorkoutLog[]>;
  findOne(id: number): Promise<WorkoutLog | null>;
  createOne(data: CREATE_WORKOUT_LOG_SCHEMA_TYPE): Promise<WorkoutLog>;
  deleteOne(id: number): Promise<WorkoutLog>;
}

const CREATE_WORKOUT_LOG_SCHEMA = z.object({
  workoutId: z.number(),
  exerciseId: z.number(),
});

type CREATE_WORKOUT_LOG_SCHEMA_TYPE = z.infer<typeof CREATE_WORKOUT_LOG_SCHEMA>;

export { IWorkoutLogRepository, CREATE_WORKOUT_LOG_SCHEMA };
export type { CREATE_WORKOUT_LOG_SCHEMA_TYPE };
