import mongoose, { Schema } from "mongoose";

const typeSchema = new Schema(
    {
        label: {
            type: String,
            required: [true, "Product Type Name is required"],
            unique: true,
            trim: true,
            lowerCase: true
        }
    },
    {
        timestamps: true
    }
)

export const Type = mongoose.model("Type", typeSchema)