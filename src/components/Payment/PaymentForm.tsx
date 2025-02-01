'use client'
import buildImg from '@/sanity/lib/buildImg'
import { BOOKING, CAR, SHIPMENT_PAYMENT_FORM_DATA } from '@/types/types'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { z } from 'zod';
import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import InputField from './InputField'
import { getCents } from '@/lib/client/functions'
import { useSession } from 'next-auth/react'

const paymentFormSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(50, "Name is too long"),
    address: z.string().min(12, "Address must be at least 12 characters").max(100, "Address is too long"),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Phone number must be in E.164 format and between 10 and 15 digits"),
    city: z.string().min(3, "City name is too short").max(50, "City name is too long"),
    pickUpLocation: z.string().min(1, "Pick-up location is").max(100, "Pick-up location is too long"),
    pickUpTime: z.string().regex(/^(0?[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9] (AM|PM)$/, "Pick-up time must be in HH:MM:SS AM/PM format"),
    pickUpDate: z.string().regex(/^\d{1,2}\/\d{1,2}\/\d{4}$/, "Pick-up date must be in M/D/YYYY format"),
    dropOffLocation: z.string().min(12, "Drop-off location must be at least 12 characters").max(100, "Drop-off location is too long"),
    dropOffTime: z.string().regex(/^(0?[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9] (AM|PM)$/, "Drop-off time must be in HH:MM:SS AM/PM format"),
    dropOffDate: z.string().regex(/^\d{1,2}\/\d{1,2}\/\d{4}$/, "Drop-off date must be in M/D/YYYY format"),
    terms: z.boolean().refine(val => val === true, "You must agree to the terms and conditions"),
});


const PaymentForm = ({ details }: { details: CAR }) => {
    const { data: session } = useSession();
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const amount = getCents(details.price_per_day);
    const [errors, setErrors] = useState<any>({});

    const [formData, setFormData] = useState<SHIPMENT_PAYMENT_FORM_DATA>({
        name: '',
        address: '',
        phone: '',
        city: '',
        pickUpLocation: 'MORENT | Warehouse',
        pickUpTime: new Date().toLocaleTimeString(),
        pickUpDate: new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString(),
        dropOffLocation: '',
        dropOffTime: new Date().toLocaleTimeString(),
        dropOffDate: new Date(new Date().setDate(new Date().getDate() + 2)).toLocaleDateString(),
        totelPrice: amount,
        carName: details.name,
        terms: false,
    });

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: formData.totelPrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [formData]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            paymentFormSchema.parse(formData);
            setErrors({});

            setLoading(true);
            if (!stripe || !elements) {
                return;
            }
            const { error: submitError } = await elements.submit();
            if (submitError) {
                setErrorMessage(submitError.message);
                setLoading(false);
                return;
            }
            // Initiate booking
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/booking`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    car_name: details.name,
                    user_email: session?.user?.email || '',
                    pick_up_location: formData.pickUpLocation,
                    pick_up_time: formData.pickUpTime,
                    pick_up_date: formData.pickUpDate,
                    drop_off_location: formData.dropOffLocation,
                    drop_off_time: formData.dropOffTime,
                    drop_off_date: formData.dropOffDate,
                    user_name: formData.name,
                    user_address: formData.address,
                    user_phone: formData.phone,
                    city: formData.city,
                    total_price: formData.totelPrice,
                    terms: formData.terms,
                    payment_intent: clientSecret,
                } as BOOKING),
            })

            const { error } = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment_success?car_slug=${details.slug.current}`,
                },
            });

            setErrorMessage(error.message);
            setLoading(false);
        } catch (err) {
            if (err instanceof z.ZodError) {
                // Set error messages in state
                const newErrors: any = {};
                err.errors.forEach((error) => {
                    newErrors[error.path[0]] = error.message;
                });
                setErrors(newErrors);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="flex justify-center bg-[#f6f7f9] py-6">
            <div className="w-[95vw] flex gap-6 flex-col-reverse lg:flex-row">
                <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className="bg-white p-6 rounded-xl flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <div className="font-bold">Billing Info</div>
                            <div className="text-[#596780] text-xs flex justify-between">
                                <div className="text-[#596780] opacity-50 text-xs">Please enter your billing info</div>
                                <div>Step 1 of 4</div>
                            </div>
                        </div>

                        <div className="flex gap-6 flex-col lg:flex-row">
                            <div className="w-full flex flex-col gap-6">
                                <InputField errors={errors} label="Name" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" />
                                <InputField errors={errors} label="Address" id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
                            </div>
                            <div className="w-full flex flex-col gap-6">
                                <InputField errors={errors} label="Phone Number" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone number" />
                                <InputField errors={errors} label="Town/City" id="city" name="city" value={formData.city} onChange={handleChange} placeholder="Town or city" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <div className="font-bold">Rental Info</div>
                            <div className="text-[#596780] text-xs flex justify-between">
                                <div className="text-[#596780] opacity-50 text-xs">Please enter your rental data</div>
                                <div>Step 2 of 4</div>
                            </div>
                        </div>
                        <div className="flex items-center mb-2">
                            <span className="flex justify-center items-center border border-white size-3 rounded-full bg-blue-500 mr-2">
                                <span className="size-2 rounded-full bg-blue-500 border border-white"></span>
                            </span>
                            <h3 className="">Pick-Up</h3>
                        </div>
                        <div className="flex gap-6 flex-col lg:flex-row">
                            <div className="w-full flex flex-col gap-6">
                                <InputField errors={errors} label="Location" id="pickUpLocation" name="pickUpLocation" value={formData.pickUpLocation} onChange={handleChange} placeholder="Location" />
                                <InputField errors={errors} label="Time" id="pickUpTime" name="pickUpTime" value={formData.pickUpTime} onChange={handleChange} placeholder="Time" />
                            </div>
                            <div className="w-full flex flex-col gap-6">
                                <InputField errors={errors} label="Date" id="pickUpDate" name="pickUpDate" value={formData.pickUpDate} onChange={handleChange} placeholder="Date" />
                            </div>
                        </div>

                        <div className="flex items-center mb-2">
                            <span className="flex justify-center items-center border border-white size-3 rounded-full bg-blue-500 mr-2">
                                <span className="size-2 rounded-full bg-blue-500 border border-white"></span>
                            </span>
                            <h3 className="">Drop-Off</h3>
                        </div>
                        <div className="flex gap-6 flex-col lg:flex-row">
                            <div className="w-full flex flex-col gap-6">
                                <InputField errors={errors} label="Location" id="dropOffLocation" name="dropOffLocation" value={formData.dropOffLocation} onChange={handleChange} placeholder="Drop-off location" />
                                <InputField errors={errors} label="Time" id="dropOffTime" name="dropOffTime" value={formData.dropOffTime} onChange={handleChange} placeholder="Drop-off time" />
                            </div>
                            <div className="w-full flex flex-col gap-6">
                                <InputField errors={errors} label="Date" id="dropOffDate" name="dropOffDate" value={formData.dropOffDate} onChange={handleChange} placeholder="Drop-off date" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <div className="font-bold">Payment Method</div>
                            <div className="text-[#596780] text-xs flex justify-between">
                                <div className="text-[#596780] opacity-50 text-xs">Please enter your payment method</div>
                                <div>Step 3 of 4</div>
                            </div>
                        </div>

                        {clientSecret ? <PaymentElement /> :
                            <div className='w-full bg-gray-200 h-10 animate-pulse'></div>
                        }

                        {errorMessage && <div className='text-xs text-red-600'>{errorMessage}</div>}
                    </div>


                    <div className="bg-white p-6 rounded-xl flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <div className="font-bold">Confirmation</div>
                            <div className="text-[#596780] text-xs flex justify-between">
                                <div className="text-[#596780] opacity-50 text-xs">We are getting to the end. Just few clicks and your rental is ready!</div>
                                <div className="text-nowrap">Step 4 of 4</div>
                            </div>
                        </div>

                        <div className="flex justify-between gap-2 bg-[#f6f7f9] text-xs py-4 px-6 rounded-md">
                            <div className="flex gap-4">
                                <input type="checkbox" defaultChecked />
                                <div className="font-bold">I agree with sending an Marketing and newsletter emails. No spam, promissed!</div>
                            </div>
                        </div>
                        <div className="flex justify-between gap-2 bg-[#f6f7f9] text-xs py-4 px-6 rounded-md">
                            <div className="flex gap-4">
                                <input
                                    id='terms'
                                    name='terms'
                                    type="checkbox"
                                    checked={formData.terms}
                                    onChange={(e) => {
                                        setFormData((prevData) => ({
                                            ...prevData, terms: e.target.checked
                                        }))
                                    }}
                                />
                                <div className="font-bold">I agree with our terms and conditions and privacy policy.</div>
                            </div>
                            {errors.terms && <p className='text-xs text-red-600'>{errors.terms}</p>}
                        </div>

                        {/* submit button */}
                        <button
                            disabled={!stripe || loading}
                            className="px-4 py-2 w-fit text-sm md:text-base bg-blue-600 hover:bg-blue-800 disabled:opacity-50 disabled:animate-pulse text-white rounded-md"
                        >
                            {!loading ? `Pay ${details.price_per_day}` : "Processing..."}
                        </button>

                        <div className="flex flex-col gap-4">
                            <Image className="w-6" src={'/checkshield.png'} alt="checkshield-icon" width={100} height={100} />
                            <div className="">All your data are safe</div>
                            <div className="text-[#596780] text-xs flex justify-between">
                                <div className="text-[#596780] opacity-50 text-xs">We are using the most advanced security to provide you the best experience ever.</div>
                            </div>
                        </div>
                    </div>
                </form>

                {/* other side */}
                <div className="bg-white p-6 rounded-xl h-fit flex flex-col gap-6 lg:w-1/2 lg:min-w-[24rem]">
                    <div className="flex flex-col gap-2 w-full">
                        <div className="font-bold">Rental Summary</div>
                        <p className="text-[#596780] text-xs max-w-sm">Prices may change depending on the length of the rental and the price of your rental car.</p>
                    </div>

                    <div className="flex gap-4 items-center">
                        <Image className="size-28 object-contain rounded-xl" src={(details.gallery || [])[0] ? buildImg(details.gallery[0] as SanityImageSource).width(400).url() : '/any.png'} alt="car-img" width={100} height={100} />
                        <div className="relative flex flex-col gap-2" >
                            <div className="text-2xl font-bold">{details.name}</div>
                            <div className='text-xs opacity-50 flex gap-1'>
                                {Array.from({ length: details.rating }, (_, index) => (
                                    <Image key={index} className="size-3" src={'/star.png'} alt="stars-icon" width={100} height={100} />
                                ))}
                                {Array.from({ length: 5 - details.rating }, (_, index) => (
                                    <Image key={index} className="size-3 grayscale" src={'/star.png'} alt="stars-icon" width={100} height={100} />
                                ))}
                                {details.reviews}+ Reviewer
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between text-sm text-[#596780]">
                        <div className="text-[#596780] opacity-50">Subtotel</div>
                        <div className="font-bold">{details.price_per_day}</div>
                    </div>
                    <div className="flex justify-between text-sm text-[#596780]">
                        <div className="text-[#596780] opacity-50">Tax</div>
                        <div className="font-bold">$0</div>
                    </div>

                    <div className="flex justify-between gap-2 bg-[#f6f7f9] text-xs py-4 px-6 rounded-md">
                        <input type="text" placeholder="Apply promo code" className="bg-transparent outline-none" />
                        <Image className="w-4" src={'/arrow-down.svg'} alt="arrow-icon" width={100} height={100} />
                    </div>

                    <div className="flex flex-col">
                        <div className="font-bold">Total Rental Price</div>
                        <div className="flex items-end justify-between">
                            <div className="text-[#596780] opacity-50 text-xs">Overall price and includes rental discount</div>
                            <div className="font-bold text-3xl">{details.price_per_day}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentForm
