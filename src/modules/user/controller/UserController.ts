import { Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import { UserService } from '../service/UserService';

@Service()
export class UserController {
  constructor(public userService: UserService) {}

  async getUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error in getUsers:', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
}
