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
        const brand = formData.get("brandName");
        const form = formData.get("form")
        const gst = formData.get("gst")
        const hsnCode = formData.get("hsnCode")
        const coo = formData.get("coo")
        const shelfLife = formData.get("shelfLife")
        const isAyurvedic = formData.get("isAyurvedic")
        const suitableFor = formData.get("suitableFor")
        const publish = formData.get("publish")
        const container = formData.get("container")

        let ayurvedicCheck: boolean;
        let suitableForCheck: boolean;
        let publishCheck: boolean;


        if (!title || !description || !price || !quantity || !discount || !category) {
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

        // Checks for boolean values
        if (isAyurvedic === "true") {
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

        const product = await Product.create({
            title: title,
            description: description,
            price: price,
            discount: discount,
            quantity: quantity,
            image: imageArray || ["https://dummyimage.com/721x401", "https://dummyimage.com/721x401", "https://dummyimage.com/721x401", "https://dummyimage.com/721x401", "https://dummyimage.com/721x401"],
            category: category,
            type: type,
            stock: stock,
            listingStatus: publishCheck,
            hsnCode: hsnCode,
            gstOnProduct: gst,
            countryOfOrigin: coo,
            shelfLife: shelfLife,
            suitableForVegeterian: suitableForCheck,
            brand: brand,
            form: form,
            ayurvedic: ayurvedicCheck,
            containerType: container
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
