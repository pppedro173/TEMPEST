import { object, string, array, TypeOf, number } from "zod";

export const createTeamSchema = object({
  body: object({
    user: string({ required_error: "User Id is required" }).min(
      24,
      "ids should be a valid MongoDB ObjectId"
    ),
    cost: number({ required_error: "Cost is required." }).nonnegative(
      "Cost can't be negative"
    ),
    players: array(string().min(24, "ids should be a valid MongoDB ObjectId")),
  }),
});

export const getTeamByIdSchema = object({
  params: object({
    id: string({ required_error: "Id is required" }).min(
      24,
      "ids should be a valid MongoDB ObjectId"
    ),
  }),
});

export type CreateTeamInput = TypeOf<typeof createTeamSchema>["body"];
export type GetTeamByIdInput = TypeOf<typeof getTeamByIdSchema>["params"];