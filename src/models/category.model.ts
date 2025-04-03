import mongoose, { Schema } from "mongoose";

const typeSchema = new Schema(
    {
        label: {
            type: String,
            required: [true, "Category Name is required"],
            unique: true,
            sparse: true,
            trim: true,
            lowerCase: true
        }
    },
    {
        timestamps: true
    }
)

export const Category = mongoose.model("Category", typeSchema)