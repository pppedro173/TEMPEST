import { NextFunction, Request, Response } from "express";
import { Player, Stats } from "../../models/player.model";
import { CreatePlayersInput, GetPlayerByIdInput, UpdatePlayersInput } from "../schemas/player.schema";
import { createPlayer, findAllPlayers, findPlayerById, updatePlayerPoints, updatePlayerStats } from "../services/player.service";


export const registerPlayersHandler = async (
    req: Request<{}, {}, CreatePlayersInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const playersPromises = req.body.players.map(async (player: Player) => {
            return await createPlayer({
                ...player
            });
        });
        const playersArray = await Promise.all(playersPromises);
        const playerCount = playersArray.length;
        res.status(201).json({
            status: "success",
            data: {
                playerCount,
                playersArray
            }
        })
    } catch (err: any) {
        next(err);
    }
}

export const updatePlayersHandler = async (
    req: Request<{}, {}, UpdatePlayersInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const playersPromises = req.body.players.map(async (player) => {
            const { name, roundPoints, ...statsValues } = player;
            const stats = new Stats(statsValues);
            await updatePlayerPoints({name: name}, roundPoints);
            return await updatePlayerStats(
                { name: name },
                stats
            );
        });

        const playersArray = await Promise.all(playersPromises);

        const playerCount = playersArray.length;
        res.status(200).json({
            status: "success",
            data: {
                playerCount,
                playersArray
            }
        })
    } catch (err: any) {
        next(err);
    }
}

export const getPlayerbyIdHandler = async (
    req: Request<{}, {}, GetPlayerByIdInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = typeof req.params.id === 'string' ? req.params.id : '';
        const player = await findPlayerById(id);
        if (!player) {
            return res.status(404).json({
                status: "error",
                message: "Player not found",
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                player,
            },
        });
    } catch (err: any) {
        next(err);
    }
}

export const getAllPlayersHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const players = await findAllPlayers();
        res.status(200).json({
            status: "success",
            data: {
                players,
            },
        });
    } catch (err: any) {
        next(err);
    }
}
