import { shipengine } from "@/lib/helper/functions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { rateId } = await req.json();

        if (!rateId) {
            return NextResponse.json(
                { error: "RateId is Required but not Available!" },
                { status: 400 }
            );
        }
        const label = await shipengine.createLabelFromRate({
            rateId,
        });
        return NextResponse.json(label, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "An error occurred while generating the label: " + error },
            { status: 500 }
        );
    }
}
