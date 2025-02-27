import { Set } from '@prisma/client';
import { CREATE_SET_SCHEMA_TYPE } from '../types';
import { ApiError } from '@src/utils/ApiError';
import { SetRepository } from '../repository/SetRepository';

export class SetService {
  private setRepository: SetRepository;

  constructor({ setRepository }: { setRepository: SetRepository }) {
    this.setRepository = setRepository;
  }

  async findSetsByLogId(workoutLogId: number): Promise<Set[]> {
    return this.setRepository.findMany(workoutLogId);
  }

  async findSetById(id: number): Promise<Set | null> {
    const set = await this.setRepository.findOne(id);
    if (!set) throw ApiError.NotFound('Set not found');
    return set;
  }

  async createSet(data: CREATE_SET_SCHEMA_TYPE): Promise<Set> {
    return this.setRepository.createOne(data);
  }

  async deleteSet(id: number): Promise<Set> {
    return this.setRepository.deleteOne(id);
  }
}
