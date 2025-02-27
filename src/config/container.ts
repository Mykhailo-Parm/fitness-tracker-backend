import { PrismaClient } from '@prisma/client';
import { AuthService } from '@src/modules/auth/service/AuthService';
import { ExerciseRepository } from '@src/modules/exercise/repository/ExerciseRepository';
import { ExerciseService } from '@src/modules/exercise/service/ExerciseService';
import { UserRepository } from '@src/modules/user/repository/UserRepository';
import { UserService } from '@src/modules/user/service/UserService';
import { asClass, asValue, createContainer } from 'awilix';

const container = createContainer();

// Register Prisma as a singleton
const prisma = new PrismaClient();

container.register({
  prisma: asValue(prisma),
  userRepository: asClass(UserRepository).singleton(),
  userService: asClass(UserService).singleton(),
  authService: asClass(AuthService).singleton(),
  exerciseRepository: asClass(ExerciseRepository).singleton(),
  exerciseService: asClass(ExerciseService).singleton(),
});

export default container;
