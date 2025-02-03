import PaymentClientWrapper from "@/components/Payment/PaymentClientWrapper";
import { CAR } from "@/types/types";

const Payment = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const slug = (await params).slug;
    let details: CAR = {} as CAR;

    try {
        const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cars?slug=${slug}`);
        details = await data.json();
    } catch (error) {
        console.log('No internet! or something else occurred. 1', error);
    };

    return (
        <PaymentClientWrapper details={details} />
    )
}

export default Payment