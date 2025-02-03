import client from '@/sanity/lib/client';
import { CAR, SHIPMENT, TRACKING } from '@/types/types';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { authOption } from '../api/auth/[...nextauth]/authOptions';
import buildImg from '@/sanity/lib/buildImg';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const Booking = async () => {
    try {
        const session = await getServerSession(authOption);

        // Fetching all required data
        const [trackingData, shipmentData, carData]: [TRACKING[], SHIPMENT[], CAR[]] = await Promise.all([
            client.fetch(`*[_type == 'tracking']`).catch(() => []),
            client.fetch(`*[_type == 'shipment']`).catch(() => []),
            client.fetch(`*[_type == 'car']`).catch(() => [])
        ]);

        // Function to retrieve the booked car for a given payment intent
        const getCurrentCar = (paymentIntent: string): CAR | undefined => {
            const shipment = shipmentData.find(ship => ship.payment_intent === paymentIntent);
            return carData.find(car => car.slug.current === shipment?.car_slug);
        };

        // Filter the user's bookings based on email
        const userPersonalData = session?.user?.email
            ? trackingData.filter(data => shipmentData.some(ship => ship.payment_intent === data.payment_intent && ship.user_email === session.user?.email))
            : [];

        return (
            <div className="container mx-auto p-4 flex flex-col items-center">
                <h1 className="text-center text-2xl text-[#3563e9] font-bold pt-6">Bookings</h1>

                <div className="flex flex-wrap py-12 items-center w-full md:max-w-[90vw] justify-center">
                    {userPersonalData.length > 0 ? userPersonalData.map((data) => {
                        const currentCar = getCurrentCar(data.payment_intent);
                        const carImage = currentCar?.gallery?.[0]
                            ? buildImg(currentCar.gallery[0] as SanityImageSource).width(720).url()
                            : '/any.png';

                        const bookingPrice = Number(currentCar?.price_per_day?.slice(1) || 0) + Number(data.amount || 0);
                        const progress = data.status === 'delivered' ? 100 : data.status === 'in-transit' ? 60 : 10;

                        return (
                            <div key={data.label_id} className="w-full md:w-80 lg:w-96 px-2 mb-4">
                                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                    <Image
                                        src={carImage}
                                        alt={currentCar?.name || 'Unknown Car'}
                                        width={400}
                                        height={300}
                                        className="w-full h-48 object-contain"
                                    />
                                    <div className="p-4 flex flex-col gap-1">
                                        <h2 className="text-xl font-semibold">{currentCar?.name || 'Unknown'}</h2>
                                        <p className="text-gray-600 text-sm">Tracking ID: {data.tracking_number}</p>
                                        <div className="mt-2 flex flex-col gap-1">
                                            <div className="h-2 bg-gray-200 rounded-full">
                                                <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${progress}%` }}></div>
                                            </div>
                                            <div className='flex justify-between w-full items-center'>
                                                <p className="text-sm text-gray-600 mt-1">{progress}% In Progress</p>
                                                <p className="text-sm text-gray-600 mt-1 bg-green-100 p-1 px-2 rounded-lg text-nowrap">
                                                    Booked in <span className='font-bold'>{'$' + bookingPrice.toLocaleString()}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }) : (
                        <div className='text-sm text-center'>
                            <Image src={'/nocars.jpg'} height={400} width={400} alt='No Cars' />
                            <p className='opacity-70'>Nothing happened wrong, just book a car now to show here!</p>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error loading bookings:', error);
        return (
            <div className="container mx-auto p-4 flex flex-col items-center">
                <h1 className="text-center text-2xl text-[#3563e9] font-bold pt-6">Bookings</h1>
                <div className="text-center text-red-500 mt-6">An error occurred while loading your bookings. Please try again later.</div>
            </div>
        );
    }
};

export default Booking;
