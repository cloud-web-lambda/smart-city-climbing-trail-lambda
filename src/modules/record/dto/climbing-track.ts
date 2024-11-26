import mongoose, { Schema, Document } from 'mongoose';

export interface ClimbingTrack extends Document {
  sub: string;
  tracks: {
    trailName: string;
    startDate: Date; // string -> date
    endDate: Date;
    distance: number;
    calories: number;
  }[];
}

const ClimbingTrackSchema: Schema = new Schema<ClimbingTrack>({
  sub: { type: String, required: true, ref: 'HikerInfo' },
  tracks: [
    {
      trailName: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      distance: { type: Number, required: true },
      calories: { type: Number, required: true },
    },
  ],
});

const ClimbingTrackModel = mongoose.model<ClimbingTrack>('ClimbingTrack', ClimbingTrackSchema);

export default ClimbingTrackModel;
