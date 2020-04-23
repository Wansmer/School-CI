import express from 'express';
import bodyParser from 'body-parser';

const router = express.Router();
const jsonParser = bodyParser.json();

import { ConfController } from '../controllers/settings';
const confController = new ConfController();

router.get('/', confController.getSettings);

router.post('/', jsonParser, confController.setSettings);

router.delete('/', confController.deleteSettings);

export default router;
