import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        description: {
            type: String,
            required: true
        },
        content: [{
            type: String,
            required: true
        }],
        price: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
        },
        quantity: {
            type: Number,
            required: true
        },
        reviews: [{
            type: String,
        }],
        image: [{
            type: String,
            required: true
        }],
        // publisher: {
        //     type: Schema.Types.ObjectId,
        //     ref: "User",
        // }

    },
    {
        timestamps: true
    }
)


export const Product = mongoose.model("Product", productSchema);