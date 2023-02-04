import mongoose, { FilterQuery, QueryOptions } from "mongoose";
import playerModel, { Player, Stats } from "../../models/player.model";

//Create player service
export const createPlayer = async (input: Partial<Player>) => {
    const player = await playerModel.create(input);
    return player.toJSON();
}

//Find player by Id
export const findPlayerById = async (id: string) => {
    const mId = new mongoose.Types.ObjectId(id);
    const player = await playerModel.findById(mId).lean();
    return player;
}

//Find all players
export const findAllPlayers = async () => {
    return await playerModel.find();
}

//Find one player by any field
export const findPlayer = async (
    query: FilterQuery<Player>,
    options: QueryOptions = {}
) => {
    return await playerModel.findOne(query, {}, options);
}

//update one player stats
export const updatePlayerStats = async (query: FilterQuery<Player>, stats: Stats) => {
    const oldPlayer = await playerModel.findOne(query);

    if (!oldPlayer) return null;

    const roundCount = oldPlayer.roundCount + 1;

    const updatedStats = {
        rating: oldPlayer.calculateAverageStat(roundCount, oldPlayer.stats.rating, stats.rating),
        acs: oldPlayer.calculateAverageStat(roundCount, oldPlayer.stats.acs, stats.acs),
        kd: oldPlayer.calculateAverageStat(roundCount, oldPlayer.stats.kd, stats.kd),
        kast: oldPlayer.calculateAverageStat(roundCount, oldPlayer.stats.kast, stats.kast),
        adr: oldPlayer.calculateAverageStat(roundCount, oldPlayer.stats.adr, stats.adr),
        kpr: oldPlayer.calculateAverageStat(roundCount, oldPlayer.stats.kpr, stats.kpr),
        apr: oldPlayer.calculateAverageStat(roundCount, oldPlayer.stats.apr, stats.apr),
        fkpr: oldPlayer.calculateAverageStat(roundCount, oldPlayer.stats.fkpr, stats.fkpr),
        fdpr: oldPlayer.calculateAverageStat(roundCount, oldPlayer.stats.fdpr, stats.fdpr),
        hs: oldPlayer.calculateAverageStat(roundCount, oldPlayer.stats.hs, stats.hs)
    };

    return await playerModel.findOneAndUpdate(query, { $set: { [`stats`]: updatedStats } }, { new: true });
};

//update one player points
export const updatePlayerPoints = async (query: FilterQuery<Player>, points: number) => {
    const oldPlayer = await playerModel.findOne(query);

    if (!oldPlayer) return null;

    const roundCount = oldPlayer.roundCount;
    await playerModel.findOneAndUpdate(query, {$set: {[`currRoundPoints`]: points}}, {new: true});
    return await playerModel.findOneAndUpdate(query, { $set: { [`pointsByRound.${roundCount}`]: points }  }, { new: true });
}