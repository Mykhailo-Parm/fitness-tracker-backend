import { NextFunction, Request, Response } from 'express';
import { POST, route } from 'awilix-express';
import { LOGIN_SCHEMA, SIGNUP_SCHEMA } from '../types';
import { AuthService } from '../service/AuthService';
import { ZodError } from 'zod';

@route('/auth')
class AuthController {
  private authService: AuthService;

  constructor({ authService }: { authService: AuthService }) {
    this.authService = authService;
  }

  @route('/register')
  @POST()
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = SIGNUP_SCHEMA.parse(req.body);
      const user = await this.authService.register(validatedData);
      res.status(201).json({ user });
    } catch (error) {
      next(error)
    }
  }

  @route('/login')
  @POST()
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = LOGIN_SCHEMA.parse(req.body);
      const token = await this.authService.login(validatedData);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
