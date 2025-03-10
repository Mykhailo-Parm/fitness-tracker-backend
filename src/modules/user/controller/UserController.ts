import { NextFunction, Request, Response } from 'express';
import { before, GET, PUT, route } from 'awilix-express';
import { authMiddleware } from '@src/middlewares/authMiddleware';
import { UserService } from '../service/UserService';
import { AuthRequest } from '@src/modules/auth/types';

@route('/users')
class UserController {
  private userService: UserService;

  constructor({ userService }: { userService: UserService }) {
    this.userService = userService;
  }

  @route('/me')
  @GET()
  @before(authMiddleware)
  async getLoggedInUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.status(200).json(await this.userService.getUser(req.user.id));
    } catch (error) {
      next(error);
    }
  }

  @route('/me')
  @PUT()
  @before(authMiddleware)
  async updateLoggedInUser(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const updatedUser = await this.userService.updateUser(
        req.user.id,
        req.body
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
