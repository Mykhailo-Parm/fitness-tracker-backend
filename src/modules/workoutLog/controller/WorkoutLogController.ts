import { before, GET, POST, DELETE, route } from 'awilix-express';
import { WorkoutLogService } from '../service/WorkoutLogService';
import { authMiddleware } from '@src/middlewares/authMiddleware';
import { AuthRequest } from '@src/modules/auth/types';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@src/utils/ApiError';
import { CREATE_WORKOUT_LOG_SCHEMA } from '../types';

@route('/workouts/:workoutId/logs')
class WorkoutLogController {
  private workoutLogService: WorkoutLogService;

  constructor({ workoutLogService }: { workoutLogService: WorkoutLogService }) {
    this.workoutLogService = workoutLogService;
  }

  @GET()
  @before(authMiddleware)
  async getAllWorkoutLogs(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const workoutId = Number(req.params.workoutId);
      if (isNaN(workoutId))
        return next(ApiError.BadRequest('Invalid Workout ID'));
      res
        .status(200)
        .json(await this.workoutLogService.findLogsByWorkoutId(workoutId));
    } catch (error) {
      next(error);
    }
  }

  @route('/:logId')
  @GET()
  @before(authMiddleware)
  async getWorkoutLogById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const logId = Number(req.params.logId);
      if (isNaN(logId)) return next(ApiError.BadRequest('Invalid Log ID'));
      res
        .status(200)
        .json(await this.workoutLogService.findWorkoutLogById(logId));
    } catch (error) {
      next(error);
    }
  }

  @POST()
  @before(authMiddleware)
  async createWorkoutLog(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const workoutId = Number(req.params.workoutId);
      if (isNaN(workoutId))
        return next(ApiError.BadRequest('Invalid Workout ID'));

      const validatedData = CREATE_WORKOUT_LOG_SCHEMA.parse({
        ...req.body,
        workoutId,
      });
      const workoutLog =
        await this.workoutLogService.createWorkoutLog(validatedData);

      res.status(201).json({ workoutLog });
    } catch (error) {
      next(error);
    }
  }

  @route('/:logId')
  @DELETE()
  @before(authMiddleware)
  async deleteWorkoutLog(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const logId = Number(req.params.logId);
      if (isNaN(logId)) return next(ApiError.BadRequest('Invalid Log ID'));

      await this.workoutLogService.deleteWorkoutLog(logId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default WorkoutLogController;
