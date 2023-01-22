import { FilterQuery, QueryOptions } from 'mongoose';
import realTeamModel, {RealTeam} from '../../models/realTeam.model';

// CreateRealTeam service
export const createRealTeam = async (input: Partial<RealTeam>) => {
  const realTeam = await realTeamModel.create(input);
  return realTeam.toJSON();
};

// Find realTeam by Id
export const findRealTeamById = async (id: string) => {
  const realTeam = await realTeamModel.findById(id).lean();
  return realTeam;
};

// Find All realTeams
export const findAllRealTeams = async () => {
  return await realTeamModel.find();
};

// Find one realTeam by any fields
export const findRealTeam = async (
  query: FilterQuery<RealTeam>,
  options: QueryOptions = {}
) => {
  return await realTeamModel.findOne(query, {}, options);
}

// Update one realTeam results array
export const updateRealTeamResults = async (query: FilterQuery<RealTeam>, round: number, result: string) => {
    return await realTeamModel.findOneAndUpdate(query, { $set: { [`seasonResults.${round}`]: result } }, { new: true });
};
