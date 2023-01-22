import express from 'express';
import { registerRealTeamHandler, updateRealTeamResultsHandler } from '../controllers/realTeam.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { createRealTeamSchema, updateRealTeamResultsSchema } from '../schemas/realTeam.schema';
import { validate } from '../middleware/validate';

const router = express.Router();
router.use(deserializeUser, requireUser);

// Register real tem route
router.post('/registerRealTeam', validate(createRealTeamSchema), registerRealTeamHandler);
router.patch('/updateRealTeamResults', validate(updateRealTeamResultsSchema), updateRealTeamResultsHandler);

export default router;

