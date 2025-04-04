import connectDB from "@/db/dbConfig";
import { Container } from "@/models/container.model";
import { NextRequest, NextResponse } from "next/server";

connectDB()
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const { category } = reqBody;

        if (!category) {
            return NextResponse.json({ error: "Category Name is required" }, { status: 400 })
        }

        const existingContainerType = await Container.findOne({ label: category })

        if (existingContainerType) {
            return NextResponse.json({ error: "Container Already Exists" }, { status: 403 })
        }

        const newContainerType = await Container.create({ label: category })

        if (!newContainerType) {
            return NextResponse.json({ error: "Failed to Add the newContainerType in DB" }, { status: 402 })
        }

        return NextResponse.json({ data: newContainerType }, { status: 200 })

    } catch (error) {
        console.log("Error Adding newContainerType : ", error)
        return NextResponse.json({ error: "Failed to Add the newContainerType in DB" }, { status: 500 })
    }
}