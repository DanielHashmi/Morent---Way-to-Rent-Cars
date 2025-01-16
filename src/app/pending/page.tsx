import Image from 'next/image';

const cars = [
    {
        id: 1,
        name: 'Tesla Model S',
        trackingId: '123456',
        progress: 70,
        imageUrl: '/images/tesla-model-s.jpg',
    },
    {
        id: 2,
        name: 'BMW i8',
        trackingId: '654321',
        progress: 50,
        imageUrl: '/images/bmw-i8.jpg',
    },
    // Add more cars as needed
];

const Pending = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-center text-2xl text-[#3563e9] font-bold pt-6">Pending Cars</h1>

            <div className="flex flex-wrap py-12 items-center justify-center">
                {cars.map((car) => (
                    <div key={car.id} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <Image src={car.imageUrl} alt={car.name} width={400} height={300} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">{car.name}</h2>
                                <p className="text-gray-600">Tracking ID: {car.trackingId}</p>
                                <div className="mt-2">
                                    <div className="h-2 bg-gray-200 rounded-full">
                                        <div
                                            className="h-2 bg-blue-500 rounded-full"
                                            style={{ width: `${car.progress}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{car.progress}% In Transit</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pending;