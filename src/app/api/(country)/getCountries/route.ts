import connectDB from "@/db/dbConfig";
import { Category } from "@/models/category.model";
import { Country } from "@/models/country.model";
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
        const getAllCountries = await Country.find();

        if (!getAllCountries) {
            return NextResponse.json({ error: "Failed to find categories" }, { status: 400 })
        }

        return NextResponse.json({ data: getAllCountries }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
    }
}