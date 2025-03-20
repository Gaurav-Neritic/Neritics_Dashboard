import connectDB from "@/db/dbConfig";
import { Product } from "@/models/product.model";
import { NextResponse } from "next/server";

connectDB();

export async function GET() {
    try {

        const getProducts = await Product.find();

        if (!getProducts) {
            return NextResponse.json({ error: "Failed to get produccts" }, { status: 402 })
        }

        return NextResponse.json({ data: getProducts }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch the products" }, { status: 500 })
    }

}