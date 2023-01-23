import express from 'express';
import { registerRealTeamHandler, updateRealTeamResultsHandler } from '../controllers/realTeam.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { createRealTeamSchema, updateRealTeamResultsSchema } from '../schemas/realTeam.schema';
import { validate } from '../middleware/validate';
import { restrictTo } from '../middleware/restrictTo';

const router = express.Router();
router.use(deserializeUser, requireUser);

// Register real tem route
router.post('/register', validate(createRealTeamSchema), restrictTo('admin'), registerRealTeamHandler);
router.patch('/results', validate(updateRealTeamResultsSchema), restrictTo('admin'), updateRealTeamResultsHandler);

export default router;

