import { Product } from "@/models/product.model";
import { uploadAssetOnCloudinary } from "@/utils/uploadAssetOnCloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    try {

        const formData = await request.formData()

        const imageFile = formData.get('editImage');
        const imageIndex = formData.get('imgIndex');
        const id = formData.get('productId');

        const index = Number(imageIndex);

        if (!imageFile || !imageIndex) {
            return NextResponse.json({ error: "Image File and Index is required" }, { status: 401 })
        }

        if (index === 0) {
            const mainImage: any = await uploadAssetOnCloudinary(imageFile, "Neritic_Testing");

            if (!mainImage) {
                return NextResponse.json({ error: "Failed to upload the image on cloudinary" }, { status: 402 })
            }

            const mainImageUrl = mainImage?.secure_url;

            const updated = await Product.findByIdAndUpdate(id, {
                $set: {
                    "image.0": mainImageUrl
                }
            },
                {
                    new: true
                }
            )

            return NextResponse.json({ data: updated }, { status: 200 })

        }

    } catch (error) {
        return NextResponse.json({ error: "Failed to update the images in database" }, { status: 500 })
    }
}