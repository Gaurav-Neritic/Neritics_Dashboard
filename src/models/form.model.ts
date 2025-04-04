import mongoose, { Schema } from "mongoose";

const typeSchema = new Schema(
    {
        formTypeName: {
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

export const Form = mongoose.model("Form", typeSchema)