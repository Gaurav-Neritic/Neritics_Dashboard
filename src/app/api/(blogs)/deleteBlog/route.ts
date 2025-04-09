import { Blog } from "@/models/blog.model";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
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