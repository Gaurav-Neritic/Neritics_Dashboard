import connectDB from "@/db/dbConfig";
import { Country } from "@/models/country.model";
import { NextRequest, NextResponse } from "next/server";

connectDB()
export async function POST(request: NextRequest) {
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
        return NextResponse.json({ error: "Failed to Add the country in DB" }, { status: 500 })
    }
}