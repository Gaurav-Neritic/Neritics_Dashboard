import connectDB from "@/db/dbConfig";
import { Form } from "@/models/form.model";
import { NextResponse } from "next/server";

connectDB()
export async function GET() {
    try {
        const getAllProductFormTypes = await Form.find();

        if (!getAllProductFormTypes) {
            return NextResponse.json({ error: "Failed to find categories" }, { status: 400 })
        }

        return NextResponse.json({ data: getAllProductFormTypes }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
    }
}