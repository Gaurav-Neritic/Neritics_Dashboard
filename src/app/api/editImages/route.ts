import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    try {

        const formData = new FormData();

    } catch (error) {
        return NextResponse.json({ error: "Failed to update the images in database" }, { status: 500 })
    }
}