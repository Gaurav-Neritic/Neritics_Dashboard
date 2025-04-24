import connectDB from "@/db/dbConfig";
import { Blog } from "@/models/blog.model";
import { User } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {
    await connectDB();
    const cookieStore = cookies();

    const token: any = (await cookieStore).get('accessToken')?.value;

    const decodedToken: any = jwt.decode(token);

    const authorizedUser = await User.findById(decodedToken?._id);

    if (!authorizedUser?.isAdmin) {
        return NextResponse.json({ error: "Unauthorized User" }, { status: 402 })
    }
    try {
        const blogs = await Blog.find();
        if (!blogs) {
            return NextResponse.json({ error: "Error Fetching Blogs " }, { status: 400 })
        }

        return NextResponse.json({ data: blogs }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}