import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        contents: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        reviews: [{
            type: String,
        }],
        images: [{
            type: String,
            required: true
        }],
        publisher:{
            type:Schema.Types.ObjectId,
            ref:"User",
        }

    },
    {
        timestamps: true
    }
)


export const Product = mongoose.model("Product", productSchema);