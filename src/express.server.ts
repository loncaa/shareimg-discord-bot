import * as express from 'express';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as xss from 'xss-clean';
import * as httpStatus from 'http-status';
import logger from './utils/logger.winston';

import routes from './routes/v1';
import errorHandler from './middlewares/error';

const PORT = process.env['PORT'] || 3000;

const app = express();

// set security HTTP headers
app.use(helmet());

app.use(morgan('dev'));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(compression());

app.use('/v1', routes);

app.listen(PORT, async () => {
    logger.info(`🚀 Server ready at http://localhost:${PORT}`)
});

// send back a 404 error for any unknown api request
app.use((error, req, res, next) => {
    next(new Error(httpStatus.NOT_FOUND + ' Not found'));
});

app.use(errorHandler);

export { app };