import { PrismaClient } from '@prisma/client';
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
});

export default container;
