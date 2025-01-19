import client from "@/sanity/lib/client";
import { CardQuery } from "@/sanity/lib/grok";
import { CAR } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const limit = req.nextUrl.searchParams.get("limit");
    const slug = req.nextUrl.searchParams.get("slug");

    try {
        let cars: CAR[] = await client.fetch(CardQuery);

        if (limit) cars = cars.slice(0, Number(limit));
        if (slug) cars = cars.filter(car => car.slug.current === slug);

        return NextResponse.json(cars, {
            headers: {
                "Access-Control-Allow-Origin": "*", 
            },
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching data." },
            {
                status: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
    }
};
