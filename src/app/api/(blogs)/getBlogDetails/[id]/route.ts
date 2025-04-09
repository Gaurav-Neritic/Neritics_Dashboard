import connectDB from "@/db/dbConfig";
import { Blog } from "@/models/blog.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await connectDB()
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