import connectDB from "@/db/dbConfig";
import { Product } from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const { id } = reqBody;

        if (!id) {
            return NextResponse.json({ error: "Didn't got the product id" }, { status: 402 })
        }

        const productDetails = await Product.findById(id);

        if (!productDetails) {
            return NextResponse.json({ error: "Failed to fetch the details from database" }, { status: 401 })
        }

        return NextResponse.json({ data: productDetails }, { status: 200 })
    } catch (error) {
        console.log("Error fetching details : ", error)
        return NextResponse.json({ error: "Failed to fetch the product detail" }, { status: 500 })
    }
}