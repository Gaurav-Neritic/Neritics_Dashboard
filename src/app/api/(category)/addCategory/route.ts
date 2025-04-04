import connectDB from "@/db/dbConfig";
import { Category } from "@/models/category.model";
import { NextRequest, NextResponse } from "next/server";

connectDB()
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const { category } = reqBody;

        console.log(category);

        const existingCategory = await Category.findOne({ label: category })

        if (existingCategory) {
            return NextResponse.json({ error: "Category Already Exists" }, { status: 403 })
        }

        if (!category) {
            return NextResponse.json({ error: "Category Name is required" }, { status: 400 })
        }

        const newCategory = await Category.create({ label: category })

        if (!category) {
            return NextResponse.json({ error: "Failed to Add the category in DB" }, { status: 402 })
        }

        return NextResponse.json({ data: newCategory }, { status: 200 })

    } catch (error) {
        console.log("Error Adding Category : ", error)
        return NextResponse.json({ error: "Failed to Add the category in DB" }, { status: 500 })
    }
}