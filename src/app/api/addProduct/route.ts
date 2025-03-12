import connectDB from "@/db/dbConfig";
import { Product } from "@/models/product.model";
import { uploadAssetOnCloudinary } from "@/utils/uploadAssetOnCloudinary";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const title = formData.get("title");
        const description = formData.get("description");
        const content = formData.get("content");
        const price = formData.get("price");
        const quantity = formData.get("quantity");
        const image = formData.get("image");
        const discount = formData.get("discount");
        const reviews = formData.get("reviews");

        if (!title || !description || !content || !price || !quantity) {
            return NextResponse.json(
                { error: "All the marked fields are required" },
                { status: 402 }
            );
        }

        // Upload the image on clouinary

        const uploadedImage: any = await uploadAssetOnCloudinary(
            image,
            "Neritic_Testing"
        );

        if (!uploadedImage) {
            return NextResponse.json(
                { error: "Failed to upload the image on cloudinary" },
                { status: 405 }
            );
        }

        const product = await Product.create({
            title,
            description,
            content,
            price,
            quantity,
            image: uploadedImage?.secure_url || '',
            discount,
            reviews,
        });

        if (!product) {
            return NextResponse.json(
                { error: "Failed to add the product to the database" },
                { status: 401 }
            );
        }

        return NextResponse.json({ data: product }, { status: 200 });
    } catch (error) {
        console.log("Error adding the poducts : ", error);
        return NextResponse.json(
            { error: "Failed to add the proucts" },
            { status: 500 }
        );
    }
}
