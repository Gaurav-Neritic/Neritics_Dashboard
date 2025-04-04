import connectDB from "@/db/dbConfig";
import { Container } from "@/models/container.model";
import { NextResponse } from "next/server";

connectDB()
export async function GET() {
    try {
        const getAllContainerTypes = await Container.find();

        if (!getAllContainerTypes) {
            return NextResponse.json({ error: "Failed to find categories" }, { status: 400 })
        }

        return NextResponse.json({ data: getAllContainerTypes }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
    }
}