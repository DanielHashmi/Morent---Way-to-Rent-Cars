'use client'
import Button from "@/components/Button";
import InputField from "@/components/Payment/InputField";
import { BOOKING, RATE_OBJECT, SHIPMENT } from "@/types/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

const shipmentFormSchema = z.object({
    state_province: z.string().min(2, { message: "State Province must be at least 2 characters long" }),
    postal_code: z.string().regex(/^\d{5}$/, { message: "Postal Code must be a 5 digit number" }),
    country_code: z.string().min(2, { message: "Country Code must be at least 2 characters long" }),
});

const Shipment = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const params = useSearchParams();
    const payment_intent: string | null = params.get('payment_intent');
    const car_slug: string | null = params.get('car_slug');
    const [rates, setRates] = useState<RATE_OBJECT[]>();
    const [labelPDFLink, setLabelPDFLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadRate, setLoadRate] = useState('');
    const [bookingDetails, setBookingDetails] = useState<BOOKING | null>(null);
    const [processStep, setProcessStep] = useState('AD');
    const [shipToData, setShipToData] = useState<SHIPMENT>({
        name: "",
        address: "",
        phone: "",
        city: "",
        state_province: "",
        postal_code: "",
        country_code: "",
        user_email: "",
        payment_intent: payment_intent || "",
        car_slug: car_slug || "",
    });

    // Fetch booking details when payment_intent changes
    useEffect(() => {
        if (!payment_intent) return;
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/booking?payment_intent=${payment_intent}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.booking) {
                    setBookingDetails(data.booking);
                }
            })
            .catch((error) => console.error("Error fetching booking details:", error));
    }, [payment_intent]);

    // Update shipToData after booking details are fetched
    useEffect(() => {
        if (bookingDetails) {
            setShipToData((prev) => ({
                ...prev,
                name: bookingDetails.user_name,
                address: bookingDetails.drop_off_location,
                phone: bookingDetails.user_phone,
                city: bookingDetails.city,
                user_email: bookingDetails.user_email,
            }));
        }
    }, [bookingDetails]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);
        try {
            shipmentFormSchema.parse(shipToData);
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/shipment/get-rates`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(shipToData),
            })
                .then((res) => res.json())
                .then((data) => {
                    setRates(data.shipmentDetails?.rateResponse?.rates)
                    setLoading(false);
                    setProcessStep('SR');
                })
                .catch((error) => console.error("Error fetching shipment rates: ", error));
        } catch (err) {
            if (err instanceof z.ZodError) {
                const newErrors: Record<string, string> = {};
                err.errors.forEach((error) => {
                    newErrors[error.path[0]] = error.message;
                });
                setErrors(newErrors);
                setLoading(false);
            }
        }
    };
    const generateLabel = async (rateObj: { rateId: string }, index: number) => {
        if (!rateObj.rateId) {
            console.error('RateID is not available in the rate object!');
            return;
        }
        setLoading(true);
        setLoadRate(`${index}`);
        try {
            const response = await fetch("/api/shipment/get-label", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rateId: rateObj.rateId }),
            });
            const labelData = await response.json();
            setLabelPDFLink(labelData?.labelDownload?.href);

            await fetch(`/api/shipment/track-label`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    carrier: labelData.carrierCode,
                    payment_intent: payment_intent,
                    tracking_number: labelData.trackingNumber,
                    label_id: labelData.labelId,
                    amount: labelData.shipmentCost.amount,
                }),
            });

            setProcessStep('VD');
        } catch (error) {
            console.log(error);
        } finally {
            setLoadRate('');
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShipToData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {!rates && processStep === 'AD' ? (
                <div className="bg-white p-8 rounded-xl w-[90%] md:w-2/3 lg:w-1/2 flex flex-col gap-8 shadow-lg">
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-xl">Additional Info</div>
                        <div className="text-[#596780] text-sm flex justify-between gap-10">
                            <div className="text-[#596780] opacity-70">We need some additional information for shipment!</div>
                            <div className="text-red-500">Required *</div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                        <InputField
                            errors={errors}
                            label="State Province"
                            id="state_province"
                            name="state_province"
                            value={shipToData.state_province}
                            onChange={handleChange}
                            placeholder="State Province Code (e.g: CA, LA)"
                        />
                        <InputField
                            errors={errors}
                            label="Postal Code"
                            id="postal_code"
                            name="postal_code"
                            value={shipToData.postal_code}
                            onChange={handleChange}
                            placeholder="Location Postal Code (e.g: 023332)"
                        />
                        <InputField
                            errors={errors}
                            label="Country Code"
                            id="country_code"
                            name="country_code"
                            value={shipToData.country_code}
                            onChange={handleChange}
                            placeholder="Country Code (e.g: UK, IN)"
                        />
                        <button className="disabled:opacity-50 disabled:animate-pulse" disabled={loading}>
                            <Button classes="bg-blue-600 w-full py-3" text={loading ? "Getting Rates..." : "Get Shipment Rates"} />
                        </button>
                    </form>
                </div>
            ) : rates && processStep === 'SR' ? (
                <div className="bg-white p-8 rounded-xl w-[90%] md:w-2/3 lg:w-1/2 flex flex-col gap-8 shadow-lg">
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-xl">Shipment Rates</div>
                        <div className="text-[#596780] text-sm">Select a rate for your shipment to generate a label!</div>
                    </div>
                    <div className="flex flex-col gap-4 max-h-[70vh] overflow-auto">
                        {rates.length ? rates.map((obj: RATE_OBJECT, index: number) => (
                            <div key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                                <div className="flex flex-col gap-1">
                                    <div className="text-lg font-bold">{obj.shippingAmount.amount} {obj.shippingAmount.currency.toUpperCase()}</div>
                                    <div className="text-sm text-[#596780]">{obj.carrierFriendlyName}</div>
                                </div>
                                <button className="disabled:opacity-50 disabled:animate-pulse" disabled={loading} onClick={() => generateLabel(obj, index)}>
                                    <Button classes="bg-blue-600" text={loadRate === `${index}` ? 'Generating Label...' : 'Generate Label'} />
                                </button>
                            </div>
                        )) : (
                            <div className="text-red-500 text-sm">We are extremely sorry for this! Currently we don&apos;t have any available courier for your selected location.</div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="bg-white p-8 rounded-xl w-[90%] md:w-2/3 lg:w-1/2 flex flex-col gap-6 shadow-lg">
                    <div className="font-bold text-xl">Booking Completed Successfully</div>
                    <div className="text-[#596780] text-sm flex justify-between gap-10">
                        <div className="text-[#596780] opacity-70">Your booking has been completed you can download the label or view your booking!</div>
                        <div className="text-green-500 text-nowrap">That&apos;s It</div>
                    </div>
                    <Link target="_blank" href={labelPDFLink}>
                        <Button classes="bg-blue-600 w-full py-3" text="Download Label" />
                    </Link>
                    <Link href={'/booking'}>
                        <Button classes="bg-green-600 hover:bg-green-800 w-full py-3" text="View Booking" />
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Shipment;
