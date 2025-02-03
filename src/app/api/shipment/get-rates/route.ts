import { shipengine } from "@/lib/helper/functions";
import client from "@/sanity/lib/client";
import { SHIPMENT } from "@/types/types";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const shipToData: SHIPMENT = await req.json();
    if (!shipToData) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: shipToData",
        }),
        { status: 400 }
      );
    }
    const shipFromData = {
      name: "MORENT - Way to Rent Cars",
      phone: "+1 555 987 6543",
      addressLine1: "456 Oak Avenue",
      cityLocality: "Los Angeles",
      stateProvince: "CA",
      postalCode: "90001",
      countryCode: "US",
      addressResidentialIndicator: "no" as const,
    };

    const item = {
      name: "Test Package",
      weight: { value: 50, unit: "pound" },
      dimensions: { height: 12, width: 18, length: 24, unit: "inch" },
    };


    const shipmentDetails = await shipengine.getRatesWithShipmentDetails({
      shipment: {
        shipTo: {
          addressLine1: shipToData.address,
          cityLocality: shipToData.city,
          postalCode: shipToData.postal_code,
          countryCode: shipToData.country_code,
          name: shipToData.name,
          phone: shipToData.phone,
          stateProvince: shipToData.state_province,
          addressResidentialIndicator: "no",
        },
        shipFrom: shipFromData,
        packages: [item]
      },

      rateOptions: {
        carrierIds: [
          process.env.SHIPENGINE_FIRST_COURIER || "",
          process.env.SHIPENGINE_SECOND_COURIER || "",
          process.env.SHIPENGINE_THIRD_COURIER || "",
          process.env.SHIPENGINE_FOURTH_COURIER || "",
        ].filter(Boolean),
      },
    });

    const existingShipment = await client.fetch(`*[_type == "shipment" && payment_intent == $payment_intent][0]`, { payment_intent: shipToData.payment_intent });

    if (!existingShipment) {
      await client.create({
        _type: "shipment",
        ...shipToData,
      });
    }

    return new Response(
      JSON.stringify({ shipToData, item, shipmentDetails }),
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching shipping rates:", error)
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
