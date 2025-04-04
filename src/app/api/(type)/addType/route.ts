import connectDB from "@/db/dbConfig";
import { Type } from "@/models/type.model";
import { NextRequest, NextResponse } from "next/server";

connectDB()
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const { category } = reqBody;

        if (!category) {
            return NextResponse.json({ error: "Category Name is required" }, { status: 400 })
        }

        const existingType = await Type.findOne({ label: category })

        if (existingType) {
            return NextResponse.json({ error: "Category Already Exists" }, { status: 403 })
        }

        const newType = await Type.create({ label: category })

        if (!newType) {
            return NextResponse.json({ error: "Failed to Add the category in DB" }, { status: 402 })
        }

        return NextResponse.json({ data: newType }, { status: 200 })

    } catch (error) {
        console.log("Error Adding Category : ", error)
        return NextResponse.json({ error: "Failed to Add the category in DB" }, { status: 500 })
    }
}