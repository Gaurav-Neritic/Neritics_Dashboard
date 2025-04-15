import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        const cookieStore = await cookies();

        const clearCookies = cookieStore.delete('accessToken') && cookieStore.delete('refreshToken')

        return NextResponse.json({ data: clearCookies }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: `"Error clearing the cookies : ${error}"` }, { status: 500 })
    }
}