import { NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest) {
    try {

    } catch (error) {
        return NextResponse.json({ error: "Failed to Update the product details" }, { status: 500 })
    }
}