import { Set } from '@prisma/client';
import { z } from 'zod';

interface ISetRepository {
  findMany(workoutLogId: number): Promise<Set[]>;
  findOne(id: number): Promise<Set | null>;
  createOne(data: CREATE_SET_SCHEMA_TYPE): Promise<Set>;
  deleteOne(id: number): Promise<Set>;
}

const CREATE_SET_SCHEMA = z.object({
  workoutLogId: z.number(),
  reps: z.number().min(1),
  weight: z.number().nullable(),
});

type CREATE_SET_SCHEMA_TYPE = z.infer<typeof CREATE_SET_SCHEMA>;

export { ISetRepository, CREATE_SET_SCHEMA };
export type { CREATE_SET_SCHEMA_TYPE };
