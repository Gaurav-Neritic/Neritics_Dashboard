import connectDB from "@/db/dbConfig";
import { Product } from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";

connectDB()
export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();

        console.log(reqBody)

        const {
            edit,
            name,
            description,
            price,
            quantity,
            stock,
            discount,
            category,
            type,
            brandName,
            form,
            isAyurvedic,
            container,
            coo,
            hsnCode,
            gst,
            shelfLife,
            suitableFor,
            publish,
        } = reqBody.data;

        let ayurvedicCheck: boolean;
        let suitableForCheck: boolean;
        let publishCheck: boolean;


        // Checks for boolean values
        if (isAyurvedic === "True") {
            ayurvedicCheck = true
        } else {
            ayurvedicCheck = false
        }

        if (suitableFor === "Vegeterian") {
            suitableForCheck = true
        } else {
            suitableForCheck = false
        }

        if (publish === "Publish") {
            publishCheck = true;
        } else {
            publishCheck = false;
        }

        const updatedProduct = await Product.findByIdAndUpdate(edit,
            {
                $set: {
                    title: name,
                    description,
                    price,
                    quantity,
                    stock,
                    discount,
                    category,
                    type,
                    brand: brandName,
                    form,
                    ayurvedic: ayurvedicCheck || false,
                    container,
                    countryOfOrigin: coo,
                    hsnCode,
                    gstOnProduct: gst,
                    shelfLife,
                    suitableForVegeterian: suitableForCheck || false,
                    listingStatus: publishCheck || false,
                }
            },
            {
                new: true
            }
        )

        if (!updatedProduct) {
            return NextResponse.json(
                { error: "Failed to Update the product details in the database" },
                { status: 402 }
            );
        }

        return NextResponse.json({ data: "Product Updated SuccessFully" }, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to Update the product details" },
            { status: 500 }
        );
    }
}
