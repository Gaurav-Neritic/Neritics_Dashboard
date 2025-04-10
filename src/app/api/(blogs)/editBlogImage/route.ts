import { Blog } from "@/models/blog.model";
import { uploadAssetOnCloudinary } from "@/utils/uploadAssetOnCloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
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