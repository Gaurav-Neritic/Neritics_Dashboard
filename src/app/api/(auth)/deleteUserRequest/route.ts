import connectDB from "@/db/dbConfig";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    await connectDB()
    try {
        const reqBody = await request.json();

        const { _id } = reqBody;

        console.log("id is : ", _id);
        if (!_id) {
            return NextResponse.json({ error: "Request id not found" }, { status: 400 })
        }

        const authorizedUser = await User.findByIdAndDelete(_id);

        if (!authorizedUser) {
            return NextResponse.json({ error: "Failed to delete the user as admin" }, { status: 402 })
        }

        return NextResponse.json({ data: "User deleted As Admin Successfully" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: `Failed to delete the user as admin in DB : ${error}` }, { status: 500 })
    }
}