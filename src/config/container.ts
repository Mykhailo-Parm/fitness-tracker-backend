import { PrismaClient } from '@prisma/client';
import { AuthService } from '@src/modules/auth/service/AuthService';
import { ExerciseRepository } from '@src/modules/exercise/repository/ExerciseRepository';
import { ExerciseService } from '@src/modules/exercise/service/ExerciseService';
import { SetRepository } from '@src/modules/set/repository/SetRepository';
import { SetService } from '@src/modules/set/service/SetService';
import { UserRepository } from '@src/modules/user/repository/UserRepository';
import { UserService } from '@src/modules/user/service/UserService';
import { WorkoutRepository } from '@src/modules/workout/repository/WorkoutRepository';
import { WorkoutService } from '@src/modules/workout/service/WorkoutService';
import { WorkoutLogRepository } from '@src/modules/workoutLog/repository/WorkoutLogRepository';
import { WorkoutLogService } from '@src/modules/workoutLog/service/WorkoutLogService';
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
  workoutRepository: asClass(WorkoutRepository).singleton(),
  workoutService: asClass(WorkoutService).singleton(),
  workoutLogRepository: asClass(WorkoutLogRepository).singleton(),
  workoutLogService: asClass(WorkoutLogService).singleton(),
  setRepository: asClass(SetRepository).singleton(),
  setService: asClass(SetService).singleton(),
});

export default container;
