import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    try {

    } catch (error) {
        return NextResponse.json({ error: `Failed to update the blog Image in DB : ${error}` }, { status: 500 })
    }
}