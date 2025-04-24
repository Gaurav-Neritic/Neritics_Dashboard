import connectDB from "@/db/dbConfig";
import { Blog } from "@/models/blog.model";
import { User } from "@/models/user.model";
import { uploadAssetOnCloudinary } from "@/utils/uploadAssetOnCloudinary";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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
        const title = formData.get('title');
        const description = formData.get('description');
        const author = formData.get('author');
        const image = formData.get('blogImage');
        const publish = formData.get("publish")
        let publishStatus: boolean;

        if (!title || !description || !author || !publish) {
            return NextResponse.json({ error: "All the fields are required" }, { status: 402 })
        }

        const existingBlogWithSameTitle = await Blog.findOne({ title })

        if (publish === "Publish") {
            publishStatus = true;
        } else {
            publishStatus = false;
        }

        if (existingBlogWithSameTitle) {
            return NextResponse.json({ error: "Blog with same title already exist in the database" }, { status: 401 })
        }

        if (!image || image === null) {
            return NextResponse.json({ error: "Didnt get the image file to upload on cloudinaary" }, { status: 404 })
        }

        const blogImage: any = await uploadAssetOnCloudinary(image, "Neritic_Testing");

        if (!blogImage) {
            return NextResponse.json({ error: "Failed to upload the blogImage on Cloudinary" }, { status: 403 })
        }

        const blog = await Blog.create({
            title,
            description,
            author,
            image: blogImage?.secure_url,
            publish: publishStatus
        })

        if (!blog) {
            return NextResponse.json({ error: "Failed to add the blog to DB" }, { status: 406 })
        }

        return NextResponse.json({ data: "Data Added Successfully" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: "Failed to Add the bolg to database" }, { status: 500 })
    }
}