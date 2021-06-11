import * as express from 'express';
import callbackRouter from './callback';
import webhookRouter from './webhook';
import authenticationRouter from './authentication';
import meRouter from './me';

const router = express.Router();

router.use(webhookRouter);
router.use(callbackRouter);
router.use(authenticationRouter);
router.use(meRouter);

export default router;