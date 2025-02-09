import morgan from 'morgan'
import cors from 'cors';
import cookieParser from 'cookie-parser'
import express, { Express } from 'express';
import routerApi from './routes'
import corsOptions from './config/corsOptions'
import { errorHandler, errorHandlers, logErrors } from './middleware';

export const PORT = 4000

const server: Express = express();

// Middlewares
server.use(cors(corsOptions));

server.use(express.json({ limit: '10mb' }));
server.use(morgan('dev'));
server.use(cookieParser());

server.use(logErrors);
server.use(errorHandlers);
server.use(errorHandler);

import './utils/auth/'
// Routing
routerApi(server);

export default server
