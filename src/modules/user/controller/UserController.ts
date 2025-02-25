import { Request, Response } from 'express';
import { before, GET, route } from 'awilix-express';
import { authMiddleware } from '@src/middlewares/authMiddleware';
import { UserService } from '../service/UserService';

@route('/users')
class UserController {
  private userService: UserService;

  constructor({ userService }: { userService: UserService }) {
    this.userService = userService;
  }

  @GET()
  @before([authMiddleware])
  async getAllUsers(req: Request, res: Response) {
    try {
      console.log(111);
      const users = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error in getAllUsers:', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
}

export default UserController;
