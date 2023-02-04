import { array, number, object, string, TypeOf } from 'zod';

export const createPlayersSchema = object({
    body: object({
        players: array(object({
            name: string({ required_error: 'Name is required' }),
            picture: string({ required_error: 'Picture is required' }).url('invalid url'),
            cost: number({ required_error: 'cost is required' }).int().nonnegative(),
            realTeam: string().min(24, 'ids should be a valid MongoDB ObjectId')
        }))
    })
});

export const updatePlayersSchema = object({
    body: object({
        players: array(object({
            name: string({ required_error: 'Name is required' }),
            rating: number({ required_error: 'Rating is required' }).nonnegative('ratings cant be negative'),
            acs: number({ required_error: 'acs is required' }).nonnegative('acs cant be negative'),
            kd: number({ required_error: 'kd is required' }).nonnegative('kd cant be negative'),
            kast: number({ required_error: 'kast is required' }).int(),
            adr: number({ required_error: 'adr is required' }).nonnegative('adr cant be negative'),
            kpr: number({ required_error: 'kpr is required' }).nonnegative('kpr cant be negative'),
            apr: number({ required_error: 'apr is required' }).nonnegative('apr cant be negative'),
            fkpr: number({ required_error: 'fkpr is required' }).nonnegative('fkpr cant be negative'),
            fdpr: number({ required_error: 'fdpr is required' }).nonnegative('fdpr cant be negative'),
            hs: number({ required_error: 'hs is required' }).int(),
            roundPoints: number({required_error: 'points are required'}).int(),
        }))
    })
});

export const getPlayerByIdSchema = object({
    params: object({
        id: string({ required_error: 'Id is required'}).min(24,'ids should be a valid MongoDB ObjectId')
    })
});

export type CreatePlayersInput = TypeOf<typeof createPlayersSchema>['body'];
export type UpdatePlayersInput = TypeOf<typeof updatePlayersSchema>['body'];
export type GetPlayerByIdInput = TypeOf<typeof getPlayerByIdSchema>['params'];