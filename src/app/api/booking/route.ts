import client from '@/sanity/lib/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const bookingData = await req.json();

    try {
        const existingBooking = await client.fetch(`*[_type == "booking" && payment_intent == $payment_intent][0]`, { payment_intent: bookingData.payment_intent });

        if (existingBooking) {
            return NextResponse.json({ message: 'Booking already exists' }, { status: 400 });
        }

        const result = await client.create({
            _type: 'booking',
            ...bookingData
        });

        return NextResponse.json({ message: 'Booking created successfully', result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating booking', error }, { status: 500 });
    }
}
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const payment_intent = searchParams.get('payment_intent');

    try {
        const booking = await client.fetch(`*[_type == "booking" && payment_intent == $payment_intent][0]`, { payment_intent });
        return NextResponse.json({ message: 'Booking retrieved successfully', booking }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error retrieving bookings', error }, { status: 500 });
    }
}