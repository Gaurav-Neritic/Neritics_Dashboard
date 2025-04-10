import mongoose, { Schema } from "mongoose";

const typeSchema = new Schema(
    {
        label: {
            type: String,
            required: [true, "formType Name is required"],
            unique: true,
            trim: true,
            lowerCase: true
        }
    },
    {
        timestamps: true
    }
)

export const Form = mongoose.models.Form || mongoose.model("Form", typeSchema)