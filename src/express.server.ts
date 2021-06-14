import * as express from 'express';
import * as path from 'path';
import morgan from './middlewares/logger.morgan';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as xss from 'xss-clean';
import * as httpStatus from 'http-status';
import logger from './utils/logger.winston';

import routes from './routes/v1';
import ApiError from './utils/api.error';

const PORT = process.env['PORT'] || 3000;

const app = express();

app.set('views', path.join(__dirname, 'views1'));
app.set('view engine', 'pug');

// set security HTTP headers
app.use(helmet());

app.use(morgan);
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
    if (!(error instanceof ApiError)) {
        next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
    }

    next(error);
});

app.use((error, req, res, next) => {
    const { statusCode, message } = error;

    const response = {
        code: statusCode,
        message
    };

    logger.error(statusCode + ' ' + message);
    res.status(statusCode).send(response);
});

export { app };