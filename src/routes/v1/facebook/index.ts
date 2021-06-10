import * as express from 'express';
import callbackRouter from './callback';
import webhookRouter from './webhook';
import authenticationRouter from './authentication';

const router = express.Router();

router.use(webhookRouter);
router.use(callbackRouter);
router.use(authenticationRouter);

export default router;