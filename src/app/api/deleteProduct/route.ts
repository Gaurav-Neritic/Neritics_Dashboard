import { Product } from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const { prodId } = reqBody;

        if (!prodId) {
            return NextResponse.json({ error: "Product id not found" }, { status: 402 })
        }

        const deletedProduct = await Product.findByIdAndDelete(prodId);

        if (!deletedProduct) {
            return NextResponse.json({ error: "Error Deleting The Product" }, { status: 403 })
        }

        return NextResponse.json({ data: "Product Deletes Successfully" }, { status: 200 })


    } catch (error) {
        return NextResponse.json({ error: "Failed to delete the produt from database" }, { status: 500 })
    }
}