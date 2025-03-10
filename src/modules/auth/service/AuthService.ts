import { UserRepository } from '@src/modules/user/repository/UserRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LOGIN_SCHEMA_TYPE, SIGNUP_SCHEMA_TYPE } from '../types';
import { ApiError } from '@src/utils/ApiError';

const JWT_SECRET = process.env.JWT_SECRET as string;

export class AuthService {
  private userRepository: UserRepository;

  constructor({ userRepository }: { userRepository: UserRepository }) {
    this.userRepository = userRepository;
  }

  async register(data: SIGNUP_SCHEMA_TYPE) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.userRepository.createOne(data);
  }

  async login(data: LOGIN_SCHEMA_TYPE) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) throw ApiError.NotFound('User not found');

    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) throw ApiError.InvalidCredentials;

    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });
  }
}
