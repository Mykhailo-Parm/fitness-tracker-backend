import { Request, Response } from 'express';
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
  async register(req: Request, res: Response) {
    try {
      const validatedData = SIGNUP_SCHEMA.parse(req.body);
      const user = await this.authService.register(validatedData);
      res.status(201).json({ message: 'User created', user });
    } catch (error) {
      console.error('Error in register:', error);

      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors });
      }

      res.status(500).json({ error: 'Internal server error' });
    }
  }

  @route('/login')
  @POST()
  async login(req: Request, res: Response) {
    try {
      const validatedData = LOGIN_SCHEMA.parse(req.body);
      const token = await this.authService.login(validatedData);
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error in login:', error);

      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors });
      }

      res.status(401).json({ error: 'Invalid credentials' });
    }
  }
}

export default AuthController;
