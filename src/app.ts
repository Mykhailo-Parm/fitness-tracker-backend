import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { loadControllers, scopePerRequest } from 'awilix-express';
import container from './config/container';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 8000;


app.use(express.json());
app.use(cors());

app.use(scopePerRequest(container));


app.use(loadControllers('**/modules/**/controller/*.ts', { cwd: __dirname }));

app.listen(PORT, () => {console.log('started')});
