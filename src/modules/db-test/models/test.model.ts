import mongoose, { Schema, Document } from 'mongoose';

interface ITest extends Document {
  name: string;
  age: number;
}

const TestSchema = new Schema<ITest>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

export default mongoose.model<ITest>('Test', TestSchema);
