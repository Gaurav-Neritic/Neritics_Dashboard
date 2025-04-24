import { Product } from "@/models/product.model";
import { User } from "@/models/user.model";
import { uploadAssetOnCloudinary } from "@/utils/uploadAssetOnCloudinary";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {


    const cookieStore = cookies();

    const token: any = (await cookieStore).get('accessToken')?.value;

    const decodedToken: any = jwt.decode(token);

    const authorizedUser = await User.findById(decodedToken?._id);

    if (!authorizedUser?.isAdmin) {
        return NextResponse.json({ error: "Unauthorized User" }, { status: 402 })
    }

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

        if (index === 1) {
            const mainImage: any = await uploadAssetOnCloudinary(imageFile, "Neritic_Testing");

            if (!mainImage) {
                return NextResponse.json({ error: "Failed to upload the image on cloudinary" }, { status: 402 })
            }

            const mainImageUrl = mainImage?.secure_url;

            const updated = await Product.findByIdAndUpdate(id, {
                $set: {
                    "image.1": mainImageUrl
                }
            },
                {
                    new: true
                }
            )

            return NextResponse.json({ data: updated }, { status: 200 })

        }

        if (index === 2) {
            const mainImage: any = await uploadAssetOnCloudinary(imageFile, "Neritic_Testing");

            if (!mainImage) {
                return NextResponse.json({ error: "Failed to upload the image on cloudinary" }, { status: 402 })
            }

            const mainImageUrl = mainImage?.secure_url;

            const updated = await Product.findByIdAndUpdate(id, {
                $set: {
                    "image.2": mainImageUrl
                }
            },
                {
                    new: true
                }
            )

            return NextResponse.json({ data: updated }, { status: 200 })

        }

        if (index === 3) {
            const mainImage: any = await uploadAssetOnCloudinary(imageFile, "Neritic_Testing");

            if (!mainImage) {
                return NextResponse.json({ error: "Failed to upload the image on cloudinary" }, { status: 402 })
            }

            const mainImageUrl = mainImage?.secure_url;

            const updated = await Product.findByIdAndUpdate(id, {
                $set: {
                    "image.3": mainImageUrl
                }
            },
                {
                    new: true
                }
            )

            return NextResponse.json({ data: updated }, { status: 200 })

        }

        if (index === 4) {
            const mainImage: any = await uploadAssetOnCloudinary(imageFile, "Neritic_Testing");

            if (!mainImage) {
                return NextResponse.json({ error: "Failed to upload the image on cloudinary" }, { status: 402 })
            }

            const mainImageUrl = mainImage?.secure_url;

            const updated = await Product.findByIdAndUpdate(id, {
                $set: {
                    "image.4": mainImageUrl
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