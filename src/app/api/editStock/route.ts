import connectDB from "@/db/dbConfig";
import { Product } from "@/models/product.model";
import { User } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function PUT(request: NextRequest) {
    const cookieStore = cookies();

    const token: any = (await cookieStore).get('accessToken')?.value;

    const decodedToken: any = jwt.decode(token);

    const authorizedUser = await User.findById(decodedToken?._id);

    if (!authorizedUser?.isAdmin) {
        return NextResponse.json({ error: "Unauthorized User" }, { status: 402 })
    }
    try {

        const reqBody = await request.json();

        const { productId, newStock } = reqBody;

        if (!newStock) {
            return NextResponse.json({ error: "New Stock Field is required" }, { status: 402 })
        }

        const updatedStock = await Product.findByIdAndUpdate(productId,
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