import { User } from '@prisma/client';
import { UserRepository } from '../repository/UserRepository';

export class UserService {
  private userRepository: UserRepository;

  constructor({ userRepository }: { userRepository: UserRepository }) {
    this.userRepository = userRepository;
  }

  async getUsers(): Promise<User[]> {
    try {
      console.log('UserService');
      return await this.userRepository.findMany();
    } catch (error) {
      console.error('Error in UserService getUsers:', error);
      throw new Error('Failed to retrieve users');
    }
  }
}
