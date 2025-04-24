
import connectDB from "@/db/dbConfig";
import { User } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    await connectDB()

    const cookieStore = cookies();

    const token: any = (await cookieStore).get('accessToken')?.value;

    const decodedToken: any = jwt.decode(token);

    const authorizedUser = await User.findById(decodedToken?._id);

    if (!authorizedUser?.isAdmin) {
        return NextResponse.json({ error: "Unauthorized User" }, { status: 402 })
    }
    try {
        const reqBody = await request.json();

        const { id, oldPassword, newPassword } = reqBody.data;

        if (!id || !oldPassword || !newPassword) {
            return NextResponse.json({ error: "All the fields are required" }, { status: 401 })
        }

        const validAdmin = await User.findById(id);

        if (!validAdmin.isAdmin) {
            return NextResponse.json({ error: "Unauthorized Access" }, { status: 402 })
        }

        const checkPrevPass = validAdmin.isPasswordCorrect(oldPassword);

        if (!checkPrevPass) {
            return NextResponse.json({ error: "Old Password didnt matched" }, { status: 403 })
        }

        validAdmin.password = newPassword;

        const updatedPass = await validAdmin.save({ validateBeforeSave: true });

        if (!updatedPass) {
            return NextResponse.json({ error: `Error updating the password ` }, { status: 404 })
        }

        return NextResponse.json({ data: updatedPass }, { status: 200 })


    } catch (error) {
        return NextResponse.json({ error: `Error updating the password : ${error}` }, { status: 500 })
    }
}