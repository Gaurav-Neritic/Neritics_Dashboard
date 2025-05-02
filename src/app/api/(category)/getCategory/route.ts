/* eslint-disable @typescript-eslint/no-explicit-any */

import connectDB from "@/db/dbConfig";
import { Category } from "@/models/category.model";
import { User } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

connectDB()
export async function GET() {
    const cookieStore = cookies();

    const token: any = (await cookieStore).get('accessToken')?.value;

    const decodedToken: any = jwt.decode(token);

    const authorizedUser = await User.findById(decodedToken?._id);

    if (!authorizedUser?.isAdmin) {
        return NextResponse.json({ error: "Unauthorized User" }, { status: 402 })
    }
    try {
        const getAllCategories = await Category.find();

        if (!getAllCategories) {
            return NextResponse.json({ error: "Failed to find categories" }, { status: 400 })
        }

        return NextResponse.json({ data: getAllCategories }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: `"Failed to fetch categories" : ${error}` }, { status: 500 })
    }
}