import { NextFunction, Request, Response } from "express";
import {
  CreateTeamInput, GetTeamByIdInput,
} from "../schemas/team.schema";
import { createTeam, findAllTeams, findTeamById } from "../services/team.service";


export const registerTeamHandler = async (
  req: Request<{}, {}, CreateTeamInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const realTeam = await createTeam({
      user: req.body.user,
      cost: req.body.cost,
      players: req.body.players,
    });

    res.status(201).json({
      status: "success",
      data: {
        realTeam,
      },
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: "fail",
        message: "user already has a team registered",
      });
    }
    next(err);
  }
};

export const getAllTeamsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const teams = await findAllTeams();
    res.status(200).json({
      status: "success",
      data: {
        teams,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getTeamHandler = async (
  req: Request<{}, {}, GetTeamByIdInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = typeof req.params.id === "string" ? req.params.id : "";
    const teams = await findTeamById(id);
    res.status(200).json({
      status: "success",
      data: {
        teams,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
