import connectDB from "@/db/dbConfig";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB()
    try {
        const requestedUser = await User.find();

        if (!requestedUser) {
            return NextResponse.json({ error: "Failed to get the request from database" }, { status: 401 })
        }

        return NextResponse.json({ data: requestedUser }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: `Error fetching the requests : ${error}` }, { status: 500 })
    }
}