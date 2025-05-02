/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/db/dbConfig";
import { Product } from "@/models/product.model";
import { User } from "@/models/user.model";
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
        const reqBody = await request.json();

        const { id } = reqBody;

        if (!id) {
            return NextResponse.json({ error: "Didn't got the product id" }, { status: 402 })
        }

        const productDetails = await Product.findById(id);

        if (!productDetails) {
            return NextResponse.json({ error: "Failed to fetch the details from database" }, { status: 401 })
        }

        return NextResponse.json({ data: productDetails }, { status: 200 })
    } catch (error) {
        console.log("Error fetching details : ", error)
        return NextResponse.json({ error: `"Failed to fetch the product detail":${error}` }, { status: 500 })
    }
}