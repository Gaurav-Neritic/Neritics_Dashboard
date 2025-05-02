/* eslint-disable @typescript-eslint/no-explicit-any */

import { Product } from "@/models/product.model";
import { User } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {

    const cookieStore = cookies();

    const token: any = (await cookieStore).get('accessToken')?.value;

    const decodedToken: any = jwt.decode(token);

    const authorizedUser = await User.findById(decodedToken?._id);

    if (!authorizedUser?.isAdmin) {
        return NextResponse.json({ error: "Unauthorized User" }, { status: 402 })
    }
    try {
        const reqBody = await request.json();

        const { id } = reqBody;

        if (!id) {
            return NextResponse.json({ error: "Product id not found" }, { status: 402 })
        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return NextResponse.json({ error: "Error Deleting The Product" }, { status: 403 })
        }

        return NextResponse.json({ data: "Product Deletes Successfully" }, { status: 200 })


    } catch (error) {
        return NextResponse.json({ error: `"Failed to delete the produt from database": ${error}` }, { status: 500 })
    }
}