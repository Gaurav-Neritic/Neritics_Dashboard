import connectDB from "@/db/dbConfig";
import { Category } from "@/models/category.model";
import { Country } from "@/models/country.model";
import { NextResponse } from "next/server";

connectDB()
export async function GET() {
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