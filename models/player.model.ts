import {
    getModelForClass,
    index,
    modelOptions,
    prop,
} from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

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

    @prop({ required: true })
    rating: mongoose.Types.Decimal128

    @prop({required: true })
    acs: mongoose.Types.Decimal128;

    @prop({required: true })
    kd: mongoose.Types.Decimal128;

    @prop({required: true })
    kast: number;

    @prop({required: true })
    adr: mongoose.Types.Decimal128;

    @prop({required: true })
    kpr: mongoose.Types.Decimal128;

    @prop({required: true })
    apr: mongoose.Types.Decimal128;

    @prop({required: true })
    fkpr: mongoose.Types.Decimal128;

    @prop({required: true })
    fdpr: mongoose.Types.Decimal128;

    @prop({required: true })
    hs: number;

    @prop ({required: true})
    roundPoints: Array<Number>;

    @prop({required: true})
    cost: number;

    @prop({required: true, minlength: 24})
    realTeam: string;
}

// Create the realTeam model from the realTeam class
const playerModel = getModelForClass(Player);
export default playerModel;

