import * as express from 'express';
import homeRouter from './home';
import facebookRouter from './facebook';


const router = express.Router();

router.use(homeRouter);
router.use('/fb', facebookRouter);

export default router;