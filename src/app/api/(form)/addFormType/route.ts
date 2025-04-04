import connectDB from "@/db/dbConfig";
import { Form } from "@/models/form.model";
import { NextRequest, NextResponse } from "next/server";

connectDB()
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const { category } = reqBody;

        if (!category) {
            return NextResponse.json({ error: "Category Name is required" }, { status: 400 })
        }

        const existingProductForm = await Form.findOne({ label: category })

        if (existingProductForm) {
            return NextResponse.json({ error: "ProductForm Already Exists" }, { status: 403 })
        }

        const newProductForm = await Form.create({ label: category })

        if (!newProductForm) {
            return NextResponse.json({ error: "Failed to Add the Product Form in DB" }, { status: 402 })
        }

        return NextResponse.json({ data: newProductForm }, { status: 200 })

    } catch (error) {
        console.log("Error Adding Category : ", error)
        return NextResponse.json({ error: "Failed to Add the Product Form in DB" }, { status: 500 })
    }
}