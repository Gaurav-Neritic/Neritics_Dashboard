import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is a required field"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is a required field"],
      trim: true
    },
    password: {
      type: String,
      required: [true, "Password is a required field"],
    },
    avatar: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
