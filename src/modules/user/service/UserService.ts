import { User } from '@prisma/client';
import { UserRepository } from '../repository/UserRepository';
import { Inject, Service } from 'typedi';

@Service()
export class UserService {
  constructor(public userRepository: UserRepository) {}

  async getUsers(): Promise<User[]> {
    console.log('UserService');
    return this.userRepository.findMany();
  }

  hello() {
    return 'Hello'
  }
}
