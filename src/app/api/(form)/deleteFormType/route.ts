/* eslint-disable @typescript-eslint/no-explicit-any */

import { Form } from "@/models/form.model";
import { User } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {

    const cookieStore = cookies();

    const token: any = (await cookieStore).get('accessToken')?.value;

    const decodedToken: any = jwt.decode(token);

    const authorizedUser = await User.findById(decodedToken?._id);

    if (!authorizedUser?.isAdmin) {
        return NextResponse.json({ error: "Unauthorized User" }, { status: 402 })
    }
    try {
        const reqBody = await request.json();

        console.log(reqBody);
        const { _id } = reqBody;

        if (!_id) {
            return NextResponse.json({ error: "Id is a required to delete the category" },
                { status: 402 })
        }

        const deletedFormType = await Form.findByIdAndDelete({ _id })

        if (!deletedFormType) {
            return NextResponse.json({ error: "Failed to delete the category from database" }, { status: 403 })
        }

        return NextResponse.json({ data: deletedFormType }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: `"Failed to delete the category":${error}` }, { status: 500 })
    }
}