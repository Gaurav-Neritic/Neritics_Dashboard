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
        const price = formData.get("price");
        const quantity = formData.get("quantity");
        const mainImage = formData.get("mainImage");
        const primaryImage = formData.get("primaryImage");
        const secondImage = formData.get("secondImage");
        const thirdImage = formData.get("thirdImage");
        const fourthImage = formData.get("fourthImage");
        const discount = formData.get("discount");
        const category = formData.get("category");
        const type = formData.get("type");
        const stock = formData.get("stock");

        if (!title || !description || !mainImage || !price || !quantity) {
            return NextResponse.json(
                { error: "All the marked fields are required" },
                { status: 402 }
            );
        }

        // Upload the image on clouinary

        const mainImg: any = await uploadAssetOnCloudinary(mainImage, "Neritic_Testing");
        const primImg: any = await uploadAssetOnCloudinary(primaryImage, "Neritic_Testing");
        const secImg: any = await uploadAssetOnCloudinary(secondImage, "Neritic_Testing");
        const thirdImg: any = await uploadAssetOnCloudinary(thirdImage, "Neritic_Testing");
        const fourthImg: any = await uploadAssetOnCloudinary(fourthImage, "Neritic_Testing");

        if (!mainImg || !primImg || !secImg || !thirdImg || !fourthImg) {
            return NextResponse.json(
                { error: "Failed to upload the images on cloudinary" },
                { status: 405 }
            );
        }

        const imageArray = [mainImg?.secure_url, primImg?.secure_url, secImg?.secure_url, thirdImg?.secure_url, fourthImg?.secure_url]

        const product = await Product.create({
            title,
            description,
            price,
            quantity,
            image: imageArray || [],
            discount,
            category,
            type,
            stock
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
