import connectDB from "@/db/dbConfig";
import { Blog } from "@/models/blog.model";
import { User } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET(_: NextRequest, params: { params: Promise<{ id: string }> }) {
    await connectDB();
    const cookieStore = cookies();

    const token: any = (await cookieStore).get('accessToken')?.value;

    const decodedToken: any = jwt.decode(token);

    const authorizedUser = await User.findById(decodedToken?._id);

    if (!authorizedUser?.isAdmin) {
        return NextResponse.json({ error: "Unauthorized User" }, { status: 402 })
    }

    try {
        const { id } = await params;

        console.log(id);

        if (!id) {
            return NextResponse.json({ error: "Id is required" }, { status: 401 })
        }

        const blog = await Blog.findById(id);

        if (!blog) {
            return NextResponse.json({ error: "Blog Not found in the database" }, { status: 402 })
        }

        return NextResponse.json({ data: blog }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: `Error fetching data from db : ${error}` }, { status: 500 })
    }
}