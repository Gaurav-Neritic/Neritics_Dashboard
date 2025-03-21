import connectDB from "@/db/dbConfig";
import { Product } from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function PUT(request: NextRequest) {
    try {

        const reqBody = await request.json();

        console.log(reqBody)

        const { _id, newStock } = reqBody;

        if (!newStock) {
            return NextResponse.json({ error: "New Stock Field is required" }, { status: 402 })
        }

        const updatedStock = await Product.findByIdAndUpdate(_id,
            {
                $set: {
                    stock: newStock
                }
            },
            {
                new: true
            }
        )

        if (!updatedStock) {
            return NextResponse.json({ error: "Failed to update the stock" }, { status: 401 })
        }

        return NextResponse.json({ data: updatedStock }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: "Error Editing the Stock" }, { status: 500 })
    }
}