import { Workout } from '@prisma/client';
import { WorkoutRepository } from '../repository/WorkoutRepository';
import { CREATE_WORKOUT_SCHEMA_TYPE } from '../types';

export class WorkoutService {
  private workoutRepository: WorkoutRepository;

  constructor({ workoutRepository }: { workoutRepository: WorkoutRepository }) {
    this.workoutRepository = workoutRepository;
  }

  async findWorkoutById(id: number): Promise<Workout | null> {
    return await this.workoutRepository.findOne(id);
  }

  async findWorkoutByUser(userId: number): Promise<Workout[]> {
    return this.workoutRepository.findMany(userId);
  }

  async createWorkout(data: CREATE_WORKOUT_SCHEMA_TYPE): Promise<Workout> {
    return this.workoutRepository.createOne(data);
  }

  async deleteWorkout(id: number): Promise<Workout> {
    return this.workoutRepository.deleteOne(id);
  }
}
