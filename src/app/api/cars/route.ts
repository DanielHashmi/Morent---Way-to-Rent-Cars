import client from "@/sanity/lib/client";
import { CardQuery } from "@/sanity/lib/grok";
import { CAR } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const limit = req.nextUrl.searchParams.get("limit");
    const slug = req.nextUrl.searchParams.get("slug");

    try {
        const cars: CAR[] = await client.fetch(CardQuery);

        if (slug) {
            const car = cars.find(car => car.slug.current === slug);
            return NextResponse.json(car, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            });
        }

        if (limit) {
            return NextResponse.json(cars.slice(0, Number(limit)), {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            });
        }

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
