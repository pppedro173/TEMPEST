import {
    getModelForClass,
    index,
    modelOptions,
    prop,
} from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';

@index({ name: 1 })

@modelOptions({
    schemaOptions: {
        // Add createdAt and updatedAt fields
        timestamps: true,
    },
})

// Export the realTeam class to be used as TypeScript type
export class RealTeam {
    @prop({ unique: true, required: true })
    name: string;

    @prop()
    picture: string;

    @prop({ required: true })
    seasonResults: Array<string>;

    @prop({required: true, minlength: 5})
    players: Array<ObjectId>;
}

// Create the realTeam model from the realTeam class
const realTeamModel = getModelForClass(RealTeam);
export default realTeamModel;

