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
    if (!user) throw ApiError.NotFound('User not found');
    return user;
  }

  async deleteUser(id: number): Promise<User> {
    return await this.userRepository.deleteOne(id);
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    return this.userRepository.updateOne(id, UPDATE_USER_SCHEMA.parse(data));
  }
}
