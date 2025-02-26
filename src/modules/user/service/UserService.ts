import { User } from '@prisma/client';
import { UserRepository } from '../repository/UserRepository';
import { UPDATE_USER_SCHEMA } from '../types';
import { ApiError } from '@src/utils/ApiError';

export class UserService {
  private userRepository: UserRepository;

  constructor({ userRepository }: { userRepository: UserRepository }) {
    this.userRepository = userRepository;
  }

  async getUser(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne(id);
    if(!user) throw ApiError.NotFound('User not found');
    return user
  }

  async deleteUser(id: number): Promise<User> {
    try {
      return await this.userRepository.deleteOne(id);
    } catch (error) {
      throw ApiError.NotFound('User not found or already deleted');
    }
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    const validatedData = UPDATE_USER_SCHEMA.parse(data);
    return this.userRepository.updateOne(id, validatedData);
  }
}
