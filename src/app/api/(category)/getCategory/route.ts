import connectDB from "@/db/dbConfig";
import { Category } from "@/models/category.model";
import { NextResponse } from "next/server";

connectDB()
export async function GET() {
    try {
        const getAllCategories = await Category.find();

        if (!getAllCategories) {
            return NextResponse.json({ error: "Failed to find categories" }, { status: 400 })
        }

        return NextResponse.json({ data: getAllCategories }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
    }
}