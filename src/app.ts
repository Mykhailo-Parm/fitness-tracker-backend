import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { loadControllers, scopePerRequest } from 'awilix-express';
import container from './config/container';

const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use(cors());

// Awilix Middleware for DI (Creates Scope for Each Request)
app.use(scopePerRequest(container));

console.log('Controllers loaded'); 

// Load All Controllers (Automatically Finds Controllers)
app.use(loadControllers('**/modules/**/controller/*.ts', { cwd: __dirname }));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
