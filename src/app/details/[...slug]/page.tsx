import Button from "@/components/Button"
import Card from "@/components/Card"
import Images from "@/components/Details/Images";
import Header from "@/components/Header"
import IconButton from "@/components/Navbar/IconButton"
import client from "@/sanity/lib/client";
import { CardQuery, UsersQuery } from "@/sanity/lib/grok";
import { CAR, USER } from "@/types/types";
import Image from "next/image"
import Link from "next/link";

export async function generateStaticParams() {
    try {
        const cars: CAR[] = await client.fetch(CardQuery);
        return cars.map((car) => ({ slug: [car.slug.current] }))
    } catch (error) {
        console.log('Failed to generate dynamic routes as static pages!', error);
        return [];
    }
};

const Details = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const slug = (await params).slug[0];
    let carDetails: CAR[] = [];
    let users: USER[] = [];
    try {
        carDetails = await client.fetch(CardQuery);
        users = await client.fetch(UsersQuery);
    } catch (error) {
        console.log('No internet! or something else occurred 3', error);
    }
    if (!carDetails.length) {
        return <div className="flex items-center justify-center text-center text-xs opacity-50 h-[388px] min-w-[304px] rounded-lg bg-white animate-pulse">Please wait or check you connection!</div>
    }
    const details: CAR = carDetails.find(car => car.slug.current === slug) as CAR;

    return (
        <div className="flex justify-between">
            <div className="md:px-16 px-6 py-8 bg-[#f6f7f9] w-full">

                <div className="flex items-start gap-6 flex-col lg:flex-row">
                    <Images details={details} />
                    <div className="size-full">
                        <div className="font-bold flex h-full justify-between bg-background flex-col gap-6 rounded-lg py-6 pl-1 sm:py-6 min-h-[28.8rem]">
                            <div className="relative flex flex-col gap-2" >
                                <div className="text-xl">{details.name}</div>
                                <div className='text-xs opacity-50 flex gap-2'>
                                    {Array.from({ length: details.rating }, (_, index) => (
                                        <Image key={index} className="w-4" src={'/star.png'} alt="stars-icon" width={100} height={100} />
                                    ))}
                                    {Array.from({ length: 5 - details.rating }, (_, index) => (
                                        <Image key={index} className="w-4 grayscale" src={'/star.png'} alt="stars-icon" width={100} height={100} />
                                    ))}
                                    {details.reviews}+ Reviewer
                                </div>

                                {details.heart && <div className="absolute right-0 flex flex-col gap-2 top-0">
                                    <Image className="size-5 rounded-full bg-background" src={'/heart.svg'} alt="heart-icon" width={100} height={100} />
                                </div>}
                            </div>
                            <p className="opacity-50 font-thin md:max-w-[519px] min-w-[35vw]">
                                {details.desc}
                            </p>
                            <div className="opacity-50 gap-4 font-thin flex flex-wrap mt-2">
                                <span>Type Car</span>
                                <span className="font-bold">{details.type}</span>
                                <span>Capacity</span>
                                <span className="font-bold">{details.seating_capacity}</span>
                                <span>Steering</span>
                                <span className="font-bold">{details.transmission}</span>
                                <span>Gasoline</span>
                                <span className="font-bold">{details.fuel_capacity}</span>
                            </div>


                            <div className='flex justify-between mt-6'>
                                <div className='flex flex-col'>
                                    <span className="text-2xl">{details.price_per_day}/  <span className='text-sm opacity-50'>day</span></span>
                                    <span className="opacity-50 line-through">{details.original_price} <span className='text-sm opacity-50'>day</span></span>
                                </div>
                                <Link href={`/payment/${details.slug.current}`}>
                                    <Button text='Rent Now' classes='bg-blue-600' />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-background my-6 p-6 flex flex-col gap-6 rounded-lg">
                    <div className="flex gap-3 items-center ">
                        <div className="font-bold">Reviews</div>
                        <div className="py-1 text-sm px-3 text-white bg-blue-600 rounded-md">{details.reviews}</div>
                    </div>

                    <div>
                        <div className="flex justify-between">
                            <div className="flex gap-3">
                                <IconButton icon="/user.png" redDot={false} />
                                <div className="flex flex-col gap-1">
                                    <div className="font-bold">Alex Stanton</div>
                                    <div className="text-xs opacity-50">CEO at Bukalapak</div>
                                </div>
                            </div>
                            <div className='text-xs opacity-50 flex flex-col items-end gap-2'>
                                21 July 2022
                                <Image className="w-20" src={'/stars.png'} alt="stars-icon" width={100} height={100} />
                            </div>
                        </div>
                        <p className="text-xs font-thin opacity-50 ml-14 mt-4 text-[#596780]">
                            We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.
                        </p>
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <div className="flex gap-3">
                                <IconButton icon="/user.png" redDot={false} />
                                <div className="flex flex-col gap-1">
                                    <div className="font-bold">Skylar Dias</div>
                                    <div className="text-xs opacity-50">CEO at Amazon</div>
                                </div>
                            </div>
                            <div className='text-xs opacity-50 flex flex-col items-end gap-2'>
                                21 July 2022
                                <Image className="w-20" src={'/stars.png'} alt="stars-icon" width={100} height={100} />
                            </div>
                        </div>
                        <p className="text-xs font-thin opacity-50 ml-14 mt-4 text-[#596780]">
                            We are greatly helped by the services of the MORENT Application. Morent has low prices and also a wide variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.
                        </p>
                    </div>

                    <div className="flex gap-3 justify-center text-[#596780]">
                        Show All
                        <Image className="w-4" src={'/arrow-down.svg'} alt="arrow-icon" width={100} height={100} />

                    </div>
                </div>
                <Header showViewAll tag="recent" text="Recent Car" />
                <div className="flex justify-start 2xl:justify-center overflow-hidden">
                    <div className="flex gap-8 py-6 w-full max-w-[1308px] flex-wrap">

                        {
                            carDetails.filter(car => car.tags && car.tags.includes('recent')).length ?
                                carDetails.filter(car => car.tags && car.tags.includes('recent')).slice(0, 6).map((car, key) => (
                                    <Card key={key} data={{
                                        slug: car.slug,
                                        name: car.name,
                                        price_per_day: car.price_per_day,
                                        type: car.type,
                                        heart: car.heart,
                                        original_price: car.original_price,
                                        available: car.available,
                                        fuel_capacity: car.fuel_capacity,
                                        seating_capacity: car.seating_capacity,
                                        tags: car.tags,
                                        transmission: car.transmission,
                                        reviews: car.reviews,
                                        desc: car.desc,
                                        rating: car.rating,
                                        gallery: car.gallery,
                                    }} users={users} />
                                ))
                                : <div className="text-xs opacity-50 text-center">No Recent Cars Available</div>
                        }

                    </div>
                </div>
                <Header showViewAll tag="recommended" text="Recommendation Car" />
                <div className="flex justify-start 2xl:justify-center overflow-hidden">
                    <div className="flex gap-8 py-6  max-w-[1308px] flex-wrap">

                        {carDetails.filter(car => car.tags && car.tags.includes('recommended')).slice(0, 6).map((car, key) => (
                            <Card key={key} data={{
                                slug: car.slug,
                                name: car.name,
                                price_per_day: car.price_per_day,
                                type: car.type,
                                heart: car.heart,
                                original_price: car.original_price,
                                available: car.available,
                                fuel_capacity: car.fuel_capacity,
                                seating_capacity: car.seating_capacity,
                                tags: car.tags,
                                transmission: car.transmission,
                                reviews: car.reviews,
                                desc: car.desc,
                                rating: car.rating,
                                gallery: car.gallery,
                            }} users={users} />
                        ))}

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Details