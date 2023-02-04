import {
    getModelForClass,
    index,
    modelOptions,
    prop,
} from '@typegoose/typegoose';

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

    constructor(stats: {
        rating?: number,
        acs?: number,
        kd?: number,
        kast?: number,
        adr?: number,
        kpr?: number,
        apr?: number,
        fkpr?: number,
        fdpr?: number,
        hs?: number
    }) {
        if (stats.rating) this.rating = stats.rating;
        if (stats.acs) this.acs = stats.acs;
        if (stats.kd) this.kd = stats.kd;
        if (stats.kast) this.kast = stats.kast;
        if (stats.adr) this.adr = stats.adr;
        if (stats.kpr) this.kpr = stats.kpr;
        if (stats.apr) this.apr = stats.apr;
        if (stats.fkpr) this.fkpr = stats.fkpr;
        if (stats.fdpr) this.fdpr = stats.fdpr;
        if (stats.hs) this.hs = stats.hs;
    }

}

@index({ name: 1 })

@modelOptions({
    schemaOptions: {
        // Add createdAt and updatedAt fields
        timestamps: true,
    },
})

// Export the player class to be used as TypeScript type
export class Player {
    @prop({ unique: true, required: true })
    name: string;

    @prop()
    picture: string;

    @prop({default:{}})
    stats: Stats

    @prop({ default: 0 })
    currRoundPoints: number;

    @prop({ required: true, default: 0 })
    cost: number;

    @prop({ required: true, minlength: 24 })
    realTeam: string;

    @prop({ default: 0 })
    roundCount: number;

    @prop({default:[]})
    pointsByRound: Array<number>;

    calculateAverageStat(roundCount: number, oldStatValue: number, newStatValue: number) {
        return (((oldStatValue * (roundCount - 1)) + newStatValue) / roundCount);
    }
}

// Create the realTeam model from the realTeam class
const playerModel = getModelForClass(Player);
export default playerModel;

