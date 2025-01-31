import Image from 'next/image';

const cars = [
    {
        id: 1,
        name: 'Tesla Model S',
        trackingId: '123456',
        progress: 70,
        imageUrl: '/images/tesla-model-s.jpg',
        price: '$140.00',
    },
    {
        id: 2,
        name: 'BMW i8',
        trackingId: '654321',
        progress: 50,
        imageUrl: '/images/bmw-i8.jpg',
        price: '$140.00',
    },
];

const Booking = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-center text-2xl text-[#3563e9] font-bold pt-6">Bookings</h1>

            <div className="flex flex-wrap py-12 items-center justify-center">
                {cars.map((car) => (
                    <div key={car.id} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <Image src={car.imageUrl} alt={car.name} width={400} height={300} className="w-full h-48 object-cover" />
                            <div className="p-4 flex flex-col gap-1">
                                <h2 className="text-xl font-semibold">{car.name}</h2>
                                <p className="text-gray-600">Tracking ID: {car.trackingId}</p>
                                <div className="mt-2 flex flex-col gap-1">
                                    <div className="h-2 bg-gray-200 rounded-full">
                                        <div
                                            className="h-2 bg-blue-500 rounded-full"
                                            style={{ width: `${car.progress}%` }}
                                        ></div>
                                    </div>
                                    <div className='flex justify-between w-full items-center'>
                                        <p className="text-sm text-gray-600 mt-1">{car.progress}% In Transit</p>
                                        <p className="text-sm text-gray-600 mt-1 bg-green-100 p-1 px-2 rounded-lg">Booked in <span className='font-bold'>{car.price}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Booking;