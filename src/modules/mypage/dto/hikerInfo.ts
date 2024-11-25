import mongoose, { Schema, Document } from 'mongoose';

export interface HikerInfo extends Document{
  sub : string;
  weight : number;
}

const HikerInfoSchema: Schema = new Schema<HikerInfo>({
  sub: {type: String, required: true, unique: true},
  weight: {
    type: Number,
    required: true,
    min: [30, "몸무게는 최소 30kg 이상이어야 합니다."],
    max: [200, "몸무게는 최대 200kg 이하여야 합니다."],
    default: 60,
    validate: {
      validator: (value:number) => Number.isInteger(value),
      message: "몸무게는 정수여야 합니다.",
    },
  },
})

const HikerInfo = mongoose.model<HikerInfo>('HikerInfo', HikerInfoSchema);

export default HikerInfo;