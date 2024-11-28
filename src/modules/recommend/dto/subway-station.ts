import mongoose, { Schema, Document } from 'mongoose';

export interface SubwayStation extends Document {
  stationName: string;
  stationLine: string;
  lat: number;
  lng: number;
}

const SubwayStationSchema: Schema = new Schema<SubwayStation>({
  stationName: { type: String, required: true, unique: true },
  stationLine: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const SubwayStationModel = mongoose.model<SubwayStation>('SubwayStation', SubwayStationSchema);

export default SubwayStationModel;
