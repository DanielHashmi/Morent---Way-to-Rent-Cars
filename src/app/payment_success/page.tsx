import Button from "@/components/Button";
import { PAYMENT } from "@/types/types";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Stripe from "stripe";
import { authOption } from "../api/auth/[...nextauth]/authOptions";
import client from "@/sanity/lib/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia",
});


const PaymentSuccess = async ({ searchParams }: { searchParams: { payment_intent: string, car_slug: string } }) => {
    const { payment_intent, car_slug } = await searchParams;
    const session = await getServerSession(authOption);
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

    const paymentData: PAYMENT = {
        amount: paymentIntent.amount,
        client_secret: payment_intent,
        method: (await stripe.paymentMethods.retrieve(paymentIntent.payment_method as string)).type || '',
        payment_date: new Date().toISOString(),
        status: paymentIntent.status,
        user_email: session?.user?.email || '',
        car_slug: car_slug || '',
    }
    const existingPayment = await client.fetch(`*[_type == "payment" && client_secret == $client_secret][0]`, { client_secret: payment_intent });

    if (!existingPayment) {
        await client.create({
            _type: "payment",
            ...paymentData,
        });
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col justify-center items-center gap-6 bg-white p-8 rounded-lg shadow-lg text-center">
                <Image src="/check.png" alt="check-icon" width={100} height={100} />
                <p className="text-lg text-gray-700">Your payment was successful!</p>
                <button>
                    <Button classes="bg-blue-600" text="Proceed to Shipment" />
                </button>
            </div>
        </div>
    );
}

export default PaymentSuccess;
