import mongoose, { Schema, Document } from "mongoose";
var bcrypt = require("bcryptjs");

export interface UserDocument extends Document {
  userName: string;
  password: string;
}

const userSchema: Schema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre<UserDocument>("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

export default mongoose.model<UserDocument>("User", userSchema);
