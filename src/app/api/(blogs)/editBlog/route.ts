import connectDB from "@/db/dbConfig";
import { Blog } from "@/models/blog.model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    await connectDB()
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