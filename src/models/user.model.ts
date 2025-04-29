import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is a required field"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is a required field"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is a required field"],
    },
    avatar: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    verifyOTP: {
      type: Number
    },
    verifyOTPExpires: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Encrypting password before saving into database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

// Password checkin when logging in
userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// Short term token
userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "15m",
    }
  );
};

// Long Term Token in the database
userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: "10d",
    }
  );
};

export const User = mongoose.models.User || mongoose.model("User", userSchema);
