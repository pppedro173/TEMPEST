import express from "express";
import {
  registerTeamHandler,
  getTeamHandler,
  getAllTeamsHandler,
} from "../controllers/team.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import {
  createTeamSchema,
  getTeamByIdSchema,
} from "../schemas/team.schema";
import { validate } from "../middleware/validate";
import { restrictTo } from "../middleware/restrictTo";

const router = express.Router();
router.use(deserializeUser, requireUser);

router.post("/register", validate(createTeamSchema), registerTeamHandler);
router.get("/team/:id", validate(getTeamByIdSchema), getTeamHandler);
router.get("/allTeams", getAllTeamsHandler);

export default router;
