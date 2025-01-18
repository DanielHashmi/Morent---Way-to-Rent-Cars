import client from "@/sanity/lib/client";
import { CardQuery } from "@/sanity/lib/grok";
import { CAR } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const limit = req.nextUrl.searchParams.get("limit");
    const slug = req.nextUrl.searchParams.get("slug");

    try {
        if (limit) {
            const cars: CAR[] = await client.fetch(CardQuery);
            return NextResponse.json(cars.slice(0, Number(limit)));
        }
        if (slug) {
            const cars: CAR[] = await client.fetch(CardQuery);
            return NextResponse.json(cars.find(car => car.slug.current === slug));
        }
        const cars: CAR[] = await client.fetch(CardQuery);
        return NextResponse.json(cars);
    } catch (error) {
        console.error('No internet or an error occurred.', error);
        return NextResponse.json(
            { error: 'An error occurred while fetching data.' },
            { status: 500 }
        );
    }
};
