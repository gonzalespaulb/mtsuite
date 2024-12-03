import 'dotenv/config';
import express, { Request } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';

import environment from '@src/constants/environment';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { AppError } from '@src/other/classes';
import authRoutes from '@src/routes/auth.routes';
import designationRoutes from '@src/routes/designation.routes';
import scheduleRoutes from '@src/routes/schedule.routes';
import userRoutes from '@src/routes/user.routes';
import globalErrorHandler from '@src/util/global-error-handler.util';

const app = express();
const port = environment.Port || 4000;

// DB setup
const DB = environment.Db?.replace('<password>', environment.DbPass) ?? '';
mongoose.connect(DB);
mongoose.connection.on('connected', () => {
  console.log('Connected to the Tascsuite database 🥳!');
});
mongoose.connection.on('error', (err) => {
  console.log(`Database error: ${err}`);
});

// Slim response size
app.use(compression());

// Security
app.use(helmet());

const originWhitelist =
  environment.NodeEnv === 'development'
    ? '*'
    : [
        'https://mtsuite.io/',
      ];
app.use(cors({ origin: '*', preflightContinue: true, credentials: true, methods: ['GET', 'POST', 'PUT', 'PATCH' , 'DELETE'] }));

app.use(morgan('dev'));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(environment.Jwt.Secret));

app.listen(port, () => {
  console.log(`App running on port ${port} 📡...`);
});

app.get('/', (req, res) => {
  res.sendStatus(HttpStatusCodes.OK);
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/designations', designationRoutes);
app.use('/api/v1/schedules', scheduleRoutes);
app.use('/api/v1/users', userRoutes);

// Errors
// --- unknown routes
app.all('*', (req: Request, res, next) =>
  next(new AppError(HttpStatusCodes.NOT_FOUND, `Could not find ${req.originalUrl} on this server!`))
);

// -- global errors
app.use(globalErrorHandler);

export default app;
