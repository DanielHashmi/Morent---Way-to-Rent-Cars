import { shipengine } from "@/lib/helper/functions";
import client from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
    label_id: string;
    tracking_number: string;
    carrier: string;
    payment_intent: string;
    amount: number;
}

export async function POST(req: NextRequest) {
    try {
        const { label_id, tracking_number, carrier, payment_intent, amount }: RequestBody = await req.json();

        if (!label_id || !tracking_number || !carrier || !payment_intent || !amount) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const label = await shipengine.trackUsingLabelId(label_id);
        const existingTracking = await client.fetch(`*[_type == "tracking" && label_id == $label_id][0]`, { label_id });

        if (!existingTracking) {
            await client.create({
                _type: 'tracking',
                carrier,
                payment_intent,
                status: label.carrierStatusDescription || "N/A",
                estimated_delivery_date: label.estimatedDeliveryDate || 'N/A',
                tracking_number,
                label_id,
                amount,
            });
        }

        return NextResponse.json(label, { status: 200 });
    } catch (error) {
        console.error("Error tracking label:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
