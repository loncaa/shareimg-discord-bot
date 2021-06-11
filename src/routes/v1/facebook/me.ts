import * as express from 'express';
import { retrieveMeObject } from '../../../services/facebook.service';
import logger from '../../../utils/logger.winston';

const router = express.Router();

router.get('/me', async (req, res) => {
    const { data } = await retrieveMeObject();
    
    res.status(200).json(data);
});

export default router;