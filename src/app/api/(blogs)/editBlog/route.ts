/* eslint-disable @typescript-eslint/no-explicit-any */

import connectDB from "@/db/dbConfig";
import { Blog } from "@/models/blog.model";
import { User } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    await connectDB();
    const cookieStore = cookies();

    const token: any = (await cookieStore).get('accessToken')?.value;

    const decodedToken: any = jwt.decode(token);

    const authorizedUser = await User.findById(decodedToken?._id);

    if (!authorizedUser?.isAdmin) {
        return NextResponse.json({ error: "Unauthorized User" }, { status: 402 })
    }
    try {
        const formData = await request.formData();

        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const author = formData.get('author') as string;
        const image = formData.get('image') as string;
        const publish = formData.get('publish') as string;
        const id = formData.get('id') as string

        if (
            !title?.trim() ||
            !description?.trim() ||
            !author?.trim() ||
            !image?.trim() ||
            !publish?.trim() ||
            !id?.trim()
        ) {
            return NextResponse.json(
                { error: "All fields are required and can't be empty" },
                { status: 400 }
            );
        }

        const publishStatus: boolean = publish.toLowerCase() === "publish";


        const updatedBlog = await Blog.findByIdAndUpdate(id,
            {
                $set: {
                    title,
                    description,
                    author,
                    image,
                    publish: publishStatus,
                },
            },
            { new: true })

        if (!updatedBlog) {
            return NextResponse.json({ error: "Blog not found or update failed" }, { status: 402 })
        }

        return NextResponse.json({ data: "Blog updated Successfully" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: `Error updating the blog in DB : ${error}` }, { status: 500 })
    }
}