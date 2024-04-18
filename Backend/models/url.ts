import mongoose, { Schema, Document } from "mongoose";

export interface URLDocument extends Document {
  slug: string;
  URL: string;
  count: number;
  createdBy: mongoose.Schema.Types.ObjectId;
}

const URLSchema: Schema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    URL: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<URLDocument>("url", URLSchema);
