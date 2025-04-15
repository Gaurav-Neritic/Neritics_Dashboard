import connectDB from "@/db/dbConfig";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    await connectDB()
    try {
        const reqBody = await request.json();

        const { _id } = reqBody.data;

        if (!_id) {
            return NextResponse.json({ error: "Request id not found" }, { status: 400 })
        }

        const authorizedUser = await User.findByIdAndUpdate(_id,
            {
                $set: {
                    isAdmin: false
                }
            },
            {
                new: true
            }
        )

        if (!authorizedUser) {
            return NextResponse.json({ error: "Failed to unauthorize the user as admin" }, { status: 402 })
        }

        return NextResponse.json({ data: "User UnSet As Admin Successfully" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: `Failed to unauthorize the user as admin in DB : ${error}` }, { status: 500 })
    }
}