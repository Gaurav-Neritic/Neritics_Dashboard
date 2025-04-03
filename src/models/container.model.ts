import mongoose, { Schema } from "mongoose";

const typeSchema = new Schema(
    {
        containerTypeName: {
            type: String,
            required: [true, "Container Name is required"],
            unique: true,
            trim: true,
            lowerCase: true
        }
    },
    {
        timestamps: true
    }
)

export const Container = mongoose.model("Container", typeSchema)