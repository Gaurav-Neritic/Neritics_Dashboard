import mongoose, { Schema } from "mongoose";

const typeSchema = new Schema(
    {
        countryName: {
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

export const Country = mongoose.model("Country", typeSchema)