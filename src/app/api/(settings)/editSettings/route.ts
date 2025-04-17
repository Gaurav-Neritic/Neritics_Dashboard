import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const { id, editedValue, editName } = reqBody.data;

        if (!id || !editedValue || !editName) {
            return NextResponse.json({ error: "id and the editedValue are needed" }, { status: 400 })
        }

        if (editName === "Full Name" || editName === "User Name") {
            const updatedUser = await User.findByIdAndUpdate(id, {
                $set: {
                    name: editedValue
                }
            }, {
                new: true
            })

            if (!updatedUser) {
                return NextResponse.json({ error: "Failed to update the userDetails" }, { status: 401 })
            }

            return NextResponse.json({ data: updatedUser }, { status: 200 })

        } else if (editName === "Email") {
            const updatedUser = await User.findByIdAndUpdate(id, {
                $set: {
                    email: editedValue
                }
            }, {
                new: true
            })

            if (!updatedUser) {
                return NextResponse.json({ error: "Failed to update the userDetails" }, { status: 401 })
            }

            return NextResponse.json({ data: updatedUser }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({ error: `Error updating the userDetails` }, { status: 500 })
    }
}