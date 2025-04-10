import mongoose, { Schema } from "mongoose";

const typeSchema = new Schema(
    {
        label: {
            type: String,
            required: [true, "Country Name is required"],
            unique: true,
            trim: true,
            lowerCase: true
        }
    },
    {
        timestamps: true
    }
)

export const Country = mongoose.models.Country || mongoose.model("Country", typeSchema)