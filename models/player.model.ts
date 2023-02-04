import {
    getModelForClass,
    index,
    modelOptions,
    prop,
} from '@typegoose/typegoose';

@index({ name: 1 })

@modelOptions({
    schemaOptions: {
        // Add createdAt and updatedAt fields
        timestamps: true,
    },
})

export class Stats {
    @prop({ required: true, default: 0.00 })
    rating: number

    @prop({ required: true, default: 0.00 })
    acs: number;

    @prop({ required: true, default: 0.00 })
    kd: number;

    @prop({ required: true, default: 0 })
    kast: number;

    @prop({ required: true, default: 0.00 })
    adr: number;

    @prop({ required: true, default: 0.00 })
    kpr: number;

    @prop({ required: true, default: 0.00 })
    apr: number;

    @prop({ required: true, default: 0.00 })
    fkpr: number;

    @prop({ required: true, default: 0.00 })
    fdpr: number;

    @prop({ required: true, default: 0.00 })
    hs: number;

}

// Export the player class to be used as TypeScript type
export class Player {
    @prop({ unique: true, required: true })
    name: string;

    @prop()
    picture: string;

    @prop({ required: true})
    stats: Stats

    @prop({ required: true })
    currRoundPoints: Array<number>;

    @prop({ required: true, default: 0 })
    cost: number;

    @prop({ required: true, minlength: 24 })
    realTeam: string;

    @prop({ required: true, default: 0 })
    roundCount: number;

    @prop({required: true, default:[]})
    pointsByRound: Array<number>;

    calculateAverageStat(roundCount: number, oldStatValue: number, newStatValue: number) {
        return (((oldStatValue * (roundCount - 1)) + newStatValue) / roundCount);
    }
}

// Create the realTeam model from the realTeam class
const playerModel = getModelForClass(Player);
export default playerModel;

