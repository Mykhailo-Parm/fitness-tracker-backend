import { UserController } from './../controller/UserController';
import express, { Router } from 'express';
import Container from 'typedi';

export default () => {
  const router = Router();

  const userController = Container.get(UserController);

  router.get('/', (req, res) => userController.getUsers(req, res));

  return router;
};
