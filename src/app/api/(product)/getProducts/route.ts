import connectDB from "@/db/dbConfig";
import { Product } from "@/models/product.model";
import { User } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

connectDB();

export async function GET() {
    try {

        const cookieStore = cookies();

        const token: any = (await cookieStore).get('accessToken')?.value;

        const decodedToken: any = jwt.decode(token);

        const authorizedUser = await User.findById(decodedToken?._id);

        if (!authorizedUser?.isAdmin) {
            return NextResponse.json({ error: "Unauthorized User" }, { status: 402 })
        }

        const getProducts = await Product.find({}, 'title price image category listingStatus stock');


        if (getProducts.length === 0) {
            return NextResponse.json({ error: "No Products Found" }, { status: 401 })
        }


        if (!getProducts) {
            return NextResponse.json({ error: "Failed to get produccts" }, { status: 402 })
        }


        return NextResponse.json({ data: getProducts }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch the products" }, { status: 500 })
    }

}