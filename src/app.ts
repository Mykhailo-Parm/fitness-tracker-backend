import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import userRoutes from './modules/user/routes/UserRoutes';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes());

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
