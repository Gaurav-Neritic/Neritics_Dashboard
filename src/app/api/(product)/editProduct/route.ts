import connectDB from "@/db/dbConfig";
import { Product } from "@/models/product.model";
import { User } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

connectDB()
export async function PUT(request: NextRequest) {

    const cookieStore = cookies();

    const token: any = (await cookieStore).get('accessToken')?.value;

    const decodedToken: any = jwt.decode(token);

    const authorizedUser = await User.findById(decodedToken?._id);

    if (!authorizedUser?.isAdmin) {
        return NextResponse.json({ error: "Unauthorized User" }, { status: 402 })
    }
    try {
        const reqBody = await request.json();

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
            benefits,
            specialIngredients,
            alergyInfo,
            coating,
            height,
            width,
            weight,
            gender,
            ageRange
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

        let benefitArray: any
        let specialIngredientsArray: any
        let alergyInfoArray: any
        let coatingArray: any

        if (typeof benefits === "string") {
            benefitArray = benefits.split(",").map((benefit: string) => benefit.trim()).filter((benefit: string) => benefit.length > 0);
        } else {
            benefitArray = benefits
        }


        if (typeof specialIngredients === "string") {
            specialIngredientsArray = specialIngredients.split(",").map((special: string) => special.trim()).filter((special: string) => special.length > 0);
        } else {
            specialIngredientsArray = specialIngredients
        }

        if (typeof alergyInfo === "string") {
            alergyInfoArray = alergyInfo.split(",").map((allergy: string) => allergy.trim()).filter((allergy: string) => allergy.length > 0);
        } else {
            alergyInfoArray = alergyInfo
        }

        if (typeof coating === "string") {
            coatingArray = coating.split(",").map((coate: string) => coate.trim()).filter((coate: string) => coate.length > 0);
        } else {
            coatingArray = coating
        }

        // Check if the array are not empty

        if (benefitArray.length <= 0 || specialIngredientsArray.length <= 0 || alergyInfoArray.length <= 0 || coatingArray.length <= 0) {
            return NextResponse.json(
                { error: "Atleast one field is  required  for the additional info" },
                { status: 400 }
            );
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
                    'dimensions.0': height,
                    'dimensions.1': width,
                    'dimensions.2': weight,
                    targetedGender: gender,
                    ageRange: ageRange,
                    benefits: benefitArray,
                    specialIngredients: specialIngredientsArray,
                    allergyInformation: alergyInfoArray,
                    coating: coatingArray,
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
