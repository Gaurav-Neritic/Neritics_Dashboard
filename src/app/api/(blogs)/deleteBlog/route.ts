/* eslint-disable @typescript-eslint/no-explicit-any */

import connectDB from "@/db/dbConfig";
import { Blog } from "@/models/blog.model";
import { User } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    await connectDB();
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

        if (!id || id.trim() === "") {
            return NextResponse.json({ error: `Id is required to delete the blog` }, { status: 400 })
        }

        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return NextResponse.json({ error: `Failed to delete the blog ` }, { status: 405 })
        }

        return NextResponse.json({ data: `Blog deleted Successfully` }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: `Failed to delete blog form DB : ${error}` }, { status: 500 })
    }
}