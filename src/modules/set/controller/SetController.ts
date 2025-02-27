import { before, GET, POST, DELETE, route } from 'awilix-express';
import { SetService } from '../service/SetService';
import { authMiddleware } from '@src/middlewares/authMiddleware';
import { AuthRequest } from '@src/modules/auth/types';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@src/utils/ApiError';
import { CREATE_SET_SCHEMA } from '../types';

@route('/workouts/:workoutId/logs/:logId/sets')
class SetController {
  private setService: SetService;

  constructor({ setService }: { setService: SetService }) {
    this.setService = setService;
  }

  @GET()
  @before(authMiddleware)
  async getAllSets(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const logId = Number(req.params.logId);
      if (isNaN(logId)) return next(ApiError.BadRequest('Invalid Log ID'));
      res.status(200).json(await this.setService.findSetsByLogId(logId));
    } catch (error) {
      next(error);
    }
  }

  @route('/:setId')
  @GET()
  @before(authMiddleware)
  async getSetById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const setId = Number(req.params.setId);
      if (isNaN(setId)) return next(ApiError.BadRequest('Invalid Set ID'));
      res.status(200).json(await this.setService.findSetById(setId));
    } catch (error) {
      next(error);
    }
  }

  @POST()
  @before(authMiddleware)
  async createSet(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const logId = Number(req.params.logId);
      if (isNaN(logId)) return next(ApiError.BadRequest('Invalid Log ID'));

      const validatedData = CREATE_SET_SCHEMA.parse({
        ...req.body,
        workoutLogId: logId,
      });
      const set = await this.setService.createSet(validatedData);

      res.status(201).json({ set });
    } catch (error) {
      next(error);
    }
  }

  @route('/:setId')
  @DELETE()
  @before(authMiddleware)
  async deleteSet(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const setId = Number(req.params.setId);
      if (isNaN(setId)) return next(ApiError.BadRequest('Invalid Set ID'));

      await this.setService.deleteSet(setId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default SetController;
