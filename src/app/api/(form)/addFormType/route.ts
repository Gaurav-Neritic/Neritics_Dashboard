/* eslint-disable @typescript-eslint/no-explicit-any */

import connectDB from "@/db/dbConfig";
import { Form } from "@/models/form.model";
import { User } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

connectDB()
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

        const { category } = reqBody;

        if (!category) {
            return NextResponse.json({ error: "Category Name is required" }, { status: 400 })
        }

        const existingProductForm = await Form.findOne({ label: category })

        if (existingProductForm) {
            return NextResponse.json({ error: "ProductForm Already Exists" }, { status: 403 })
        }

        const newProductForm = await Form.create({ label: category })

        if (!newProductForm) {
            return NextResponse.json({ error: "Failed to Add the Product Form in DB" }, { status: 402 })
        }

        return NextResponse.json({ data: newProductForm }, { status: 200 })

    } catch (error) {
        console.log("Error Adding Category : ", error)
        return NextResponse.json({ error: `"Failed to Add the Product Form in DB" : ${error}` }, { status: 500 })
    }
}