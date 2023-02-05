import { FilterQuery, QueryOptions } from "mongoose";
import teamModel, { Team } from "../../models/team.model";

// CreateTeam service
export const createTeam = async (input: Partial<Team>) => {
  const team = await teamModel.create(input);
  return team.toJSON();
};

// Find team by Id
export const findTeamById = async (id: string) => {
  const team = await teamModel.findById(id).lean();
  return team;
};

// Find All teams
export const findAllTeams = async () => {
  return await teamModel.find();
};

// Find one team by any fields
export const findTeam = async (
  query: FilterQuery<Team>,
  options: QueryOptions = {}
) => {
  return await teamModel.findOne(query, {}, options);
};

// Update one team points
export const updateTeamPoints = async (
  query: FilterQuery<Team>,
  points: number
) => {
  const team = await teamModel.findOne(query);
  if (!team) return null;

  const roundCount = team.roundCount;
  const newPoints = team.increasePoints(team.points, points);

  await teamModel.updateOne(query, {
    $set: { points: newPoints, [`pointsByRound.${roundCount}`]: points },
  });

  return await teamModel.findOne(query);
};

