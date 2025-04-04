import connectDB from "@/db/dbConfig";
import { Type } from "@/models/type.model";
import { NextResponse } from "next/server";

connectDB()
export async function GET() {
    try {
        const getAllTypes = await Type.find();

        if (!getAllTypes) {
            return NextResponse.json({ error: "Failed to find categories" }, { status: 400 })
        }

        return NextResponse.json({ data: getAllTypes }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
    }
}