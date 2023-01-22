import { object, string, array, TypeOf, number } from 'zod';

export const createRealTeamSchema = object({
  body: object({
    name: string({ required_error: 'Name is required' }),
    picture: string(),
    seasonResults: array(string()),
    players: array(string().min(24, 'ids should be a valid MongoDB ObjectId')),
})});

export const updateRealTeamResultsSchema = object({
    body: object({
        name: string({required_error: "Name is required"}),
        round: number().nonnegative(),
        result: string().max(1, { message: "Must be exactly 1 characters long" }).regex(/^[wl]$/, 'result should be either "w" or "l"'),
    })
});


export type CreateRealTeamInput = TypeOf<typeof createRealTeamSchema>['body'];
export type UpdateRealTeamResultsInput = TypeOf<typeof updateRealTeamResultsSchema>['body'];