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
        // content: [{
        //     type: String,
        //     required: true
        // }],
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
        image: [{
            type: String,
            required: true
        }],
        category: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        stock: {
            type: String,
            required: true
        }
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