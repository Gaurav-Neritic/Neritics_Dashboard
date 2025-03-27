import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    try {

        const formData = await request.formData()

        const mainImg = formData.get('mainImage');

    } catch (error) {
        return NextResponse.json({ error: "Failed to update the images in database" }, { status: 500 })
    }
}