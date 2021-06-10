import * as express from 'express';
import logger from '../../../utils/logger.winston';

const router = express.Router();

router.post('/callback', (req, res) => {
    let body = req.body;
    logger.log(body);

    res.sendStatus(200);
});

export default router;