import { before, GET, POST, route } from 'awilix-express';
import { WorkoutService } from './../service/WorkoutService';
import { authMiddleware } from '@src/middlewares/authMiddleware';
import { AuthRequest } from '@src/modules/auth/types';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@src/utils/ApiError';
import { CREATE_WORKOUT_SCHEMA } from '../types';

@route('/workouts')
class WorkoutController {
  private workoutService: WorkoutService;

  constructor({ workoutService }: { workoutService: WorkoutService }) {
    this.workoutService = workoutService;
  }

  @GET()
  @before(authMiddleware)
  async getAllWorkoutsFromLoggedInUser(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      res
        .status(200)
        .json(await this.workoutService.findWorkoutByUser(req.user.id));
    } catch (error) {
      next(error);
    }
  }

  @route('/:id')
  @GET()
  @before(authMiddleware)
  async getWorkoutById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return next(ApiError.BadRequest('Invalid ID'));
      }
      res.status(200).json(await this.workoutService.findWorkoutById(id));
    } catch (error) {
      next(error);
    }
  }

  @POST()
  @before(authMiddleware)
  async createWorkout(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const validatedData = CREATE_WORKOUT_SCHEMA.parse(req.body);
      const workout = await this.workoutService.createWorkout(validatedData);
      res.status(200).json({ workout });
    } catch (error) {
      next(error);
    }
  }
}

export default WorkoutController;
