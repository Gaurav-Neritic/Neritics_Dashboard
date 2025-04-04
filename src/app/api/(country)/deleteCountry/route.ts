
import { Country } from "@/models/country.model";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    try {
        const reqBody = await request.json();

        console.log(reqBody);
        const { _id } = reqBody;

        if (!_id) {
            return NextResponse.json({ error: "Id is a required to delete the category" },
                { status: 402 })
        }

        const deletedCountry = await Country.findByIdAndDelete({ _id })

        if (!deletedCountry) {
            return NextResponse.json({ error: "Failed to delete the category from database" }, { status: 403 })
        }

        return NextResponse.json({ data: deletedCountry }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: "Failed to delete the category" }, { status: 500 })
    }
}