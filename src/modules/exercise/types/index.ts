import { Exercise } from '@prisma/client';
import { z } from 'zod';

interface IExerciseRepository {
  findMany: () => Promise<Exercise[]>;
  findOne: (id: number) => Promise<Exercise | null>;
}

const CREATE_EXERCISE_SCHEMA = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  muscleGroup: z.string().min(1, 'Muscle group is required'),
});

type CREATE_EXERCISE_SCHEMA_TYPE = z.infer<typeof CREATE_EXERCISE_SCHEMA>;

export { IExerciseRepository, CREATE_EXERCISE_SCHEMA };
export type { CREATE_EXERCISE_SCHEMA_TYPE };
