import { UserRepository } from '@src/modules/user/repository/UserRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LOGIN_SCHEMA_TYPE, SIGNUP_SCHEMA_TYPE } from '../types';

const JWT_SECRET = process.env.JWT_SECRET as string;

export class AuthService {
  private userRepository: UserRepository;

  constructor({ userRepository }: { userRepository: UserRepository }) {
    this.userRepository = userRepository;
  }

  async register(data: SIGNUP_SCHEMA_TYPE) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.userRepository.createOne({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });
  }

  async login(data: LOGIN_SCHEMA_TYPE) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) throw new Error('User not found');

    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) throw new Error('Invalid credentials');

    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });
  }
}
