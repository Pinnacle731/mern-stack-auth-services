import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import authRouter from './routes/authRouter';
import tenantRouter from './routes/tenantRouter';
import userRouter from './routes/userRouter';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { configEnv } from './config/config';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());

// Serve static files from .well-known
app.use(
  '/.well-known',
  express.static(path.join(__dirname, '../public/.well-known')),
);

app.get(`${configEnv.baseUrl}/`, async (req: Request, res: Response) => {
  res.send('Welcome to the API!!!');
});

app.use(`${configEnv.baseUrl}/auth`, authRouter);
app.use(`${configEnv.baseUrl}/tenants`, tenantRouter);
app.use(`${configEnv.baseUrl}/users`, userRouter);

// global error handler
app.use(globalErrorHandler);

export default app;
