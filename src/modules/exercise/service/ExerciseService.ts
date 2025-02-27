import { Exercise } from '@prisma/client';
import { ExerciseRepository } from '../repository/ExerciseRepository';
import { ApiError } from '@src/utils/ApiError';
export class ExerciseService {
  private exerciseRepository: ExerciseRepository;

  constructor({
    exerciseRepository,
  }: {
    exerciseRepository: ExerciseRepository;
  }) {
    this.exerciseRepository = exerciseRepository;
  }

  async getExercises(): Promise<Exercise[]> {
    return await this.exerciseRepository.findMany();
  }

  async getExercise(id: number): Promise<Exercise | null> {
    const exercise = await this.exerciseRepository.findOne(id);
    if (!exercise) throw ApiError.NotFound('Exercise not found');
    return exercise;
  }
}
