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
            type: Number,
            required: true
        },
        listingStatus: {
            type: Boolean,
            required: true
        },
        hsnCode: {
            type: Number,
            required: true
        },
        gstOnProduct: {
            type: Number,
            required: true
        },
        countryOfOrigin: {
            type: String,
            required: true
        },
        shelfLife: {
            type: String,
            required: true
        },
        suitableForVegeterian: {
            type: Boolean,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        form: {
            type: String,
        },
        ayurvedic: {
            type: Boolean,
        },
        containerType: {
            type: String,
        },
        targetedGender: {
            type: String,
            enum: ['Male', 'Female', 'Both'],
            required: true
        },
        ageRange: {
            type: String,
            required: true
        },
        benefits: [{
            type: String,
            required: true
        }],
        specialIngredients: [{
            type: String,
            required: true
        }],
        allergyInformation: [{
            type: String,
        }],
        coating: [{
            type: String
        }],
        dimensions: [{
            type: String
        }]
    },
    {
        timestamps: true
    }
)


export const Product = mongoose.model("Product", productSchema); 