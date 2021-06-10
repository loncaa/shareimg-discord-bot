import * as httpStatus from 'http-status';
import * as express from 'express';
import ApiError from '../utils/api.error';

const router = express.Router();

router.use((error, req, res, next) => {
    if (!(error instanceof ApiError)) {
        next(new ApiError(httpStatus.NOT_FOUND, ' Not found'));
    }

    next(error);
});

router.use((error, req, res, next) => {
    const { statusCode, message } = error;

    const response = {
        code: statusCode,
        message
      };

    res.status(statusCode).send(response);
});


export default router;