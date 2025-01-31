'use client'
import { getCents } from "@/app/api/client/functions";
import PaymentForm from "@/components/Payment/PaymentForm";
import { CAR } from "@/types/types";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PaymentClientWrapper = ({ details }: { details: CAR }) => {
    return (
        <Elements
            stripe={stripePromise}
            options={{
                mode: "payment",
                amount: getCents(details.price_per_day),
                currency: "usd",
            }}
        >
            <PaymentForm details={details} />
        </Elements>
    )
}

export default PaymentClientWrapper