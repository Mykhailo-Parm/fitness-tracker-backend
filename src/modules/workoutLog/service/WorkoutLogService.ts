import { WorkoutLog } from '@prisma/client';
import { WorkoutLogRepository } from '../repository/WorkoutLogRepository';
import { CREATE_WORKOUT_LOG_SCHEMA_TYPE } from '../types';
import { ApiError } from '@src/utils/ApiError';

export class WorkoutLogService {
  private workoutLogRepository: WorkoutLogRepository;

  constructor({
    workoutLogRepository,
  }: {
    workoutLogRepository: WorkoutLogRepository;
  }) {
    this.workoutLogRepository = workoutLogRepository;
  }

  async findLogsByWorkoutId(workoutId: number): Promise<WorkoutLog[]> {
    return this.workoutLogRepository.findMany(workoutId);
  }

  async findWorkoutLogById(id: number): Promise<WorkoutLog | null> {
    const log = await this.workoutLogRepository.findOne(id);
    if (!log) throw ApiError.NotFound('Workout Log not found');
    return log;
  }

  async createWorkoutLog(
    data: CREATE_WORKOUT_LOG_SCHEMA_TYPE
  ): Promise<WorkoutLog> {
    return this.workoutLogRepository.createOne(data);
  }

  async deleteWorkoutLog(id: number): Promise<WorkoutLog> {
    return this.workoutLogRepository.deleteOne(id);
  }
}
