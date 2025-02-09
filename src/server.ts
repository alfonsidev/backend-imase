
import morgan from 'morgan'
import cors from 'cors';
import cookieParser from 'cookie-parser'
import express, { Application } from 'express';
import routerApi from './routes'
import corsOptions from './config/corsOptions'
import { errorHandlers } from './middleware';
// import { logErrors } from './middleware/'
import './utils/auth/'

export const PORT = 4000

const server: Application = express();

// Middlewares
server.use(cors(corsOptions));

server.use(express.json({ limit: '10mb' }));
server.use(morgan('dev'));
server.use(cookieParser());



// server.use(logErrors);
server.use(errorHandlers);
// server.use(errorHandler);



// Routing
routerApi(server);

export default server

