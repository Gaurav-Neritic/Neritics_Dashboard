import connectDB from "@/db/dbConfig";
import { Blog } from "@/models/blog.model";
import { User } from "@/models/user.model";
import { uploadAssetOnCloudinary } from "@/utils/uploadAssetOnCloudinary";
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

        const newImage = formData.get('newImage');
        const id = formData.get('id');

        if (!newImage || !id) {
            return NextResponse.json({ error: "Image not found" }, { status: 400 })
        }

        const updatedImage: any = await uploadAssetOnCloudinary(newImage, "Neritic_Testing");

        if (!updatedImage) {
            return NextResponse.json({ error: "Failed to upload image on Cloudinary" }, { status: 404 })
        }

        const finalImage = await Blog.findByIdAndUpdate(id,
            {
                $set: {
                    image: updatedImage?.secure_url
                }
            },
            {
                new: true
            }
        )

        if (!finalImage) {
            return NextResponse.json({ error: "Failed to find and update image in db" }, { status: 402 })
        }

        return NextResponse.json({ data: finalImage }, { status: 200 })


    } catch (error) {
        return NextResponse.json({ error: `Failed to update the blog Image in DB : ${error}` }, { status: 500 })
    }
}