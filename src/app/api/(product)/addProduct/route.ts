/* eslint-disable @typescript-eslint/no-explicit-any */

import connectDB from "@/db/dbConfig";
import { Product } from "@/models/product.model";
import { User } from "@/models/user.model";
import { uploadAssetOnCloudinary } from "@/utils/uploadAssetOnCloudinary";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function POST(request: NextRequest) {

    const cookieStore = cookies();

    const token: any = (await cookieStore).get('accessToken')?.value;

    const decodedToken: any = jwt.decode(token);

    const authorizedUser = await User.findById(decodedToken?._id);

    if (!authorizedUser?.isAdmin) {
        return NextResponse.json({ error: "Unauthorized User" }, { status: 402 })
    }
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
        const benefits: any = formData.get("benefits");
        const specialIngerdients: any = formData.get("specialIngerdients");
        const allergy: any = formData.get("allergy");
        const coating: any = formData.get("coating");
        const height = formData.get("height");
        const width = formData.get("width");
        const weight = formData.get("weight");
        const gender = formData.get("gender")
        const ageRange = formData.get("ageRange")

        let ayurvedicCheck: boolean;
        let suitableForCheck: boolean;
        let publishCheck: boolean;

        const benefitArray = JSON.parse(benefits)
        const specialArray = JSON.parse(specialIngerdients)
        const allergyArray = JSON.parse(allergy)
        const coatingArray = JSON.parse(coating)

        if (!title || !description || !price || !quantity || !discount || !category) {
            return NextResponse.json(
                { error: "All the marked fields are required" },
                { status: 402 }
            );
        }

        // Check if the array are not empty

        if (benefitArray.length <= 0 || specialArray.length <= 0 || allergyArray.length <= 0 || coatingArray.length <= 0) {
            return NextResponse.json(
                { error: "Atleast one field is  required  for the additional info" },
                { status: 400 }
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
                { error: "Failed to upload image on cloudinary " },
                { status: 403 }
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
            containerType: container,
            targetedGender: gender,
            ageRange: ageRange,
            benefits: benefitArray,
            specialIngredients: specialArray,
            allergyInformation: allergyArray,
            coating: coatingArray,
            'dimensions.0': height,
            'dimensions.1': width,
            'dimensions.2': weight
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
