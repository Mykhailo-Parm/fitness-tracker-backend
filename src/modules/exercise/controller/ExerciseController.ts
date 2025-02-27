import { NextFunction, Request, Response } from 'express';
import { GET, route } from 'awilix-express';
import { ExerciseService } from '../service/ExerciseService';
import { ApiError } from '@src/utils/ApiError';

@route('/exercises')
class ExerciseController {
  private exerciseService: ExerciseService;

  constructor({ exerciseService }: { exerciseService: ExerciseService }) {
    this.exerciseService = exerciseService;
  }

  @GET()
  async getAllExercises(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json(await this.exerciseService.getExercises());
    } catch (error) {
      next(error);
    }
  }

  @route('/:id')
  @GET()
  async getExerciseById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return next(ApiError.BadRequest('Invalid ID'));
      }
      res.status(200).json(await this.exerciseService.getExercise(id));
    } catch (error) {
      next(error);
    }
  }
}

export default ExerciseController;
