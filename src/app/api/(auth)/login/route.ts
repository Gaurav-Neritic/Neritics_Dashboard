import connectDB from "@/db/dbConfig";
import { User } from "@/models/user.model";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await connectDB();
    try {
        const reqBody = await request.json();

        const { email, password } = reqBody.data;

        if (!email || !password) {
            return NextResponse.json({ error: `Email and Password is required` }, { status: 400 })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User Not Found" }, { status: 401 })
        }

        const validatePassword = await user.isPasswordCorrect(password);

        if (!validatePassword) {
            return NextResponse.json({ error: "Password Incorrect : Check Credentials" }, { status: 402 })
        }

        if (user?.isAdmin === false) {
            return NextResponse.json({ data: "Requested For Access" }, { status: 200 })
        }

        const accessToken = await user?.generateAccessToken();
        const refreshToken = await user?.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: true });

        if (!accessToken || !refreshToken) {
            return NextResponse.json({ error: "Failed to create the access and refresh Token" }, { status: 405 })
        }



        const loggedInUser = await User.findById(user?._id).select("-password -refreshToken");

        if (!loggedInUser) {
            return NextResponse.json({ error: "Cannot find the logged User" }, { status: 403 })
        }

        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const options = {
            httpOnly: true,
            secure: true,
            expires: expires
        }
        const cookieStore = await cookies();
        //Browser Cookies for authentication : Short Term
        cookieStore.set('accessToken', accessToken);
        // DB token for validation : Long Term
        cookieStore.set('refreshToken', refreshToken, options);

        return NextResponse.json({ data: loggedInUser }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: `Error logging In : ${error}` }, { status: 500 })
    }
}