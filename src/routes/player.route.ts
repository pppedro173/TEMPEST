import express from 'express';
import { registerPlayersHandler, updatePlayersHandler, getPlayerbyIdHandler, getAllPlayersHandler } from '../controllers/player.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { createPlayersSchema, updatePlayersSchema, getPlayerByIdSchema } from '../schemas/player.schema';
import { validate } from '../middleware/validate';
import { restrictTo } from '../middleware/restrictTo';

const router = express.Router();
router.use(deserializeUser, requireUser);

router.post('/register', validate(createPlayersSchema), restrictTo('admin'), registerPlayersHandler);
router.patch('/update', validate(updatePlayersSchema), restrictTo('admin'), updatePlayersHandler);
router.get('/player/:id', validate(getPlayerByIdSchema), getPlayerbyIdHandler);
router.get('/Allplayers', getAllPlayersHandler);

export default router;