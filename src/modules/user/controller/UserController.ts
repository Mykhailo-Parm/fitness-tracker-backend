import { Request, Response } from 'express';
import { UserService } from '../service/UserService';
import { GET, route } from 'awilix-express';

@route('/users')
class UserController {
  private userService: UserService;

  constructor({ userService }: { userService: UserService }) {
    this.userService = userService;
  }

  @GET()
  async getAllUsers(req: Request, res: Response) {
    try {
      console.log(111)
      const users = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error in getAllUsers:', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
}

export default UserController;
