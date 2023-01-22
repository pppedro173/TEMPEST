import { NextFunction, Request, Response } from 'express';
import { CreateRealTeamInput, UpdateRealTeamResultsInput } from '../schemas/realTeam.schema';
import { createRealTeam, updateRealTeamResults } from '../services/realTeam.service';
import { Schema } from 'mongoose';

export const registerRealTeamHandler = async (
    req: Request<{}, {}, CreateRealTeamInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const playersStringArray = req.body.players;

        const players = playersStringArray.map((player) => new Schema.Types.ObjectId(player));

        const realTeam = await createRealTeam({
            name: req.body.name,
            picture: req.body.picture,
            seasonResults: req.body.seasonResults,
            players: players,
        });

        res.status(201).json({
            status: 'success',
            data: {
                realTeam,
            },
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'name already exists',
            });
        }
        next(err);
    }
};

export const updateRealTeamResultsHandler = async (
    req: Request<{}, {}, UpdateRealTeamResultsInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const query = {
            name: req.body.name
        };

        // Update realTeam results
        const updatedRealTeam = await updateRealTeamResults(query, req.body.round, req.body.result);
        if (!updatedRealTeam) {
            return res.status(404).json({
                status: 'error',
                message: 'RealTeam not found',
            });
        }
        res.status(200).json({
            status: 'success',
            data: updatedRealTeam,
        });
    } catch (err: any) {
        next(err);
    }
};

