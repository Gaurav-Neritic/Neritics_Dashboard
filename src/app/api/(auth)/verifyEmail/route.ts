import connectDB from "@/db/dbConfig";
import { generateVerificationCode } from "@/helpers/generateVerificationCode";
import { User } from "@/models/user.model";
import { sendEmail } from "@/utils/emailSender";
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
        const reqBody = await request.json();

        const { email } = reqBody;

        if (!email) {
            return NextResponse.json({ error: `Email id is required` }, { status: 400 })
        }

        const verificationCode = await generateVerificationCode();
        const expirationTime = new Date(Date.now() + 5 * 60 * 1000);

        const userOtpInDB = await User.findByIdAndUpdate(decodedToken?._id,
            { $set: { verifyOTP: verificationCode, verifyOTPExpires: expirationTime } },
            { new: true })

        if (!userOtpInDB) {
            return NextResponse.json({ error: `Failed to set the Verification OTP in database` }, { status: 402 })
        }

        const emailSent = await sendEmail(email, verificationCode);

        console.log(emailSent)

        return NextResponse.json({ data: "OTP sent on email successfully" }, { status: 200 })


    } catch (error) {
        return NextResponse.json({ error: `Failed to send the Verification OTP` }, { status: 500 })
    }
}