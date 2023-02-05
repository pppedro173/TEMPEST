import {
  getModelForClass,
  index,
  modelOptions,
  prop,
} from "@typegoose/typegoose";

@index({ user: 1 })
@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true,
  },
})

// Export the team class to be used as TypeScript type
export class Team {
  @prop({ unique: true, required: true })
  user: string;

  @prop({ required: true })
  cost: number;

  @prop({ required: true })
  players: Array<string>;

  @prop({ default: 0 })
  points: number;

  @prop({ default: [] })
  pointsByRound: Array<number>;

  @prop({ default: 0 })
  roundCount: number;

  increasePoints(oldPoints: number, newPoints: number) {
    return oldPoints + newPoints;
  }
}

// Create the team model from the realTeam class
const teamModel = getModelForClass(Team);
export default teamModel;
