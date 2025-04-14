import connectDB from "@/db/dbConfig";
import { User } from "@/models/user.model";
import { uploadAssetOnCloudinary } from "@/utils/uploadAssetOnCloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await connectDB();
    try {
        const formData = await request.formData();

        const name = formData.get('name')
        const email = formData.get('email')
        const password = formData.get('password')
        const avatar = formData.get('avatar')

        if (!name || !email || !password) {
            return NextResponse.json({ error: "All the fields are required" }, { status: 400 })
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ error: "User with this email already exists" }, { status: 401 })
        }

        const avatarImage: any = await uploadAssetOnCloudinary(avatar, "Neritic_User_Avatars");

        if (!avatarImage) {
            return NextResponse.json({ error: "Failed to upload the image on cloudinary" },
                { status: 402 }
            )
        }

        const signedUpUser = await User.create({
            name,
            email,
            password,
            avatar: avatarImage?.secure_url,
        });

        if (!signedUpUser) {
            return NextResponse.json({ error: `Failed to signup the user in DB` }, { status: 500 })
        };

        return NextResponse.json({ data: signedUpUser.select("-password -refreshToken") }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: `Error signing In : ${error}` }, { status: 500 })
    }
}