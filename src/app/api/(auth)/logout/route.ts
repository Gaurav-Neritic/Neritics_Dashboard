/* eslint-disable @typescript-eslint/no-unused-expressions */

import connectDB from "@/db/dbConfig";
import { User } from "@/models/user.model";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    await connectDB()
    try {
        const reqBody = await request.json();

        console.log(reqBody);
        const { _id } = reqBody;

        if (!_id) {
            return NextResponse.json({ error: `no _id found` }, { status: 401 })
        }

        const loggedOutUser = await User.findByIdAndUpdate(_id, {
            $set: {
                refreshToken: ""
            }
        },
            {
                new: true
            }
        );

        const cookieStore = cookies();

        {
            (await cookieStore).delete('accessToken') && (await cookieStore).delete('refreshToken');
        };

        if (!loggedOutUser) {
            return NextResponse.json({ error: `Failed to logout the user` }, { status: 402 })
        }

        return NextResponse.json({ data: "LOGGED OUT SUCCESSFULLY" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: `Failed to logout : ${error}` }, { status: 500 })
    }
}