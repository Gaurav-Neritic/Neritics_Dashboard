/* eslint-disable @typescript-eslint/no-explicit-any */

import connectDB from "@/db/dbConfig";
import { Country } from "@/models/country.model";
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

        const existingCountry = await Country.findOne({ label: category })

        if (existingCountry) {
            return NextResponse.json({ error: "Country Already Exists" }, { status: 403 })
        }

        const newCountry = await Country.create({ label: category })

        if (!newCountry) {
            return NextResponse.json({ error: "Failed to Add the country in DB" }, { status: 402 })
        }

        return NextResponse.json({ data: newCountry }, { status: 200 })

    } catch (error) {
        console.log("Error Adding Country : ", error)
        return NextResponse.json({ error: `"Failed to Add the country in DB":${error}` }, { status: 500 })
    }
}