import connectDB from "@/db/dbConfig";
import { Blog } from "@/models/blog.model";
import { NextResponse } from "next/server";


export async function GET() {
    await connectDB()
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