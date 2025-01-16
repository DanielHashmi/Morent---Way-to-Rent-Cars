import Button from "@/components/Button"
import Card from "@/components/Card"
import Header from "@/components/Header"
import IconButton from "@/components/Navbar/IconButton"
import buildImg from "@/sanity/lib/buildImg";
import client from "@/sanity/lib/client";
import { CarDetailsQuery, CardQuery } from "@/sanity/lib/grok";
import { CARCARD, DETAILPAGE } from "@/types/types";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image"
import Link from "next/link";

export async function generateStaticParams() {
    try {
        const slugs_objs: { slug: { current: string } }[] = await client.fetch("*[_type == 'detail_page']{slug{current}}");
        return slugs_objs.map((obj) => ({ slug: [obj.slug.current] }))
    } catch (error) {
        console.log('No internet! or something else occurred.', error);
    }
};

const Category = async ({ params }: { params: Promise<{ slug: string }> }) => {
    let carDetails: CARCARD[] = [];
    let details: DETAILPAGE = {
        name: "",
        capacity: "",
        reviews: 0,
        slug: {
            current: ""
        },
        car_type: "",
        desc: "",
        old_price: "",
        current_price: "",
        gasoline: "",
        steering: "",
        heart: false,
        image: null,
        _id: ""
    };
    try {
        carDetails = await client.fetch(CardQuery);
        details = (await client.fetch(CarDetailsQuery((await params).slug)))[0];
    } catch (error) {
        console.log('No internet! or something else occurred.', error);
    }
    return (
        <div className="flex justify-between ">
            <div className="min-w-72 border-t hidden xl:flex flex-col p-6 gap-6">
                <div className="text-xs opacity-50">TYPE</div>

                <div className="flex gap-2 items-center">
                    <Image className="size-6" src='/checkbox.svg' alt="checkbox-icon" width={100} height={100} />
                    Sports <span className="opacity-50">(12)</span>
                </div>
                <div className="flex gap-2 items-center">
                    <Image className="size-6" src='/checkbox.svg' alt="checkbox-icon" width={100} height={100} />
                    SUV <span className="opacity-50">(12)</span>
                </div>
                <div className="flex gap-2 items-center">
                    <Image className="size-6" src='/uncheckedbox.svg' alt="checkbox-icon" width={100} height={100} />
                    MPV <span className="opacity-50">(12)</span>
                </div>
                <div className="flex gap-2 items-center">
                    <Image className="size-6" src='/uncheckedbox.svg' alt="checkbox-icon" width={100} height={100} />
                    Sedan <span className="opacity-50">(12)</span>
                </div>
                <div className="flex gap-2 items-center">
                    <Image className="size-6" src='/uncheckedbox.svg' alt="checkbox-icon" width={100} height={100} />
                    Coupe <span className="opacity-50">(12)</span>
                </div>
                <div className="flex gap-2 items-center">
                    <Image className="size-6" src='/uncheckedbox.svg' alt="checkbox-icon" width={100} height={100} />
                    Hatchback <span className="opacity-50">(12)</span>
                </div>

                <div className="text-xs opacity-50">CAPACITY</div>

                <div className="flex gap-2 items-center">
                    <Image className="size-6" src='/checkbox.svg' alt="checkbox-icon" width={100} height={100} />
                    2 Person <span className="opacity-50">(12)</span>
                </div>
                <div className="flex gap-2 items-center">
                    <Image className="size-6" src='/uncheckedbox.svg' alt="checkbox-icon" width={100} height={100} />
                    4 Person <span className="opacity-50">(12)</span>
                </div>
                <div className="flex gap-2 items-center">
                    <Image className="size-6" src='/uncheckedbox.svg' alt="checkbox-icon" width={100} height={100} />
                    6 Person <span className="opacity-50">(12)</span>
                </div>
                <div className="flex gap-2 items-center">
                    <Image className="size-6" src='/checkbox.svg' alt="checkbox-icon" width={100} height={100} />
                    8 Person <span className="opacity-50">(12)</span>
                </div>

                <div className="text-xs opacity-50">PRICE</div>


                <div className="flex gap-2 items-start flex-col">
                    <Image className="w-full" src='/seekbar.svg' alt="checkbox-icon" width={100} height={100} />
                    Max. $100.00
                </div>
            </div>
            <div className="md:px-16 px-6 py-8 bg-[#f6f7f9] w-full">

                <div className="flex items-start gap-6 flex-col lg:flex-row">
                    <div className="gap-6 flex flex-col w-full">
                        <div className={`relative text-white p-6 md:p-8 rounded-lg min-h-[20rem]`}>
                            {/* Content Section */}
                            <div className="relative z-10 flex flex-col gap-6 md:max-w-lg">
                                <h1 className="text-2xl sm:text-4xl leading-tight max-w-sm">
                                    Sports car with the best design and acceleration
                                </h1>
                                <p className="text-sm md:text-base text-blue-100 max-w-sm">
                                    Safety and comfort while driving a
                                    futuristic and elegant sports car
                                </p>
                            </div>

                            {/* Car Image */}
                            <Image
                                src={buildImg(details.image as SanityImageSource).width(400).url()}
                                alt="Car Rental"
                                className="object-cover object-left"
                                fill
                            />
                        </div>
                        <div className="flex gap-2 sm:gap-6">
                            <div className="bg-white ring-2 rounded-lg ring-blue-600 p-1 max-h-[116px] w-1/3 min-w-[32%] sm:min-w-28 max-w-[144px]">
                                <div className={`bg-blue-600 rounded-lg size-full relative`}>
                                    {/* Car Image */}
                                    <Image
                                        src={buildImg(details.image as SanityImageSource).width(400).url()}
                                        alt="Car Rental"
                                        className="object-contain w-40 h-full object-top"
                                        width={200}
                                        height={200}

                                    />
                                </div>
                            </div>

                            <div className={`relative w-1/3 min-w-[32%] sm:min-w-28 max-w-[148px] max-h-[124px] p-6 md:p-8 rounded-lg`}>
                                {/* Car Image */}
                                <Image
                                    src="/carhandle.png"
                                    alt="Car Rental"
                                    className="object-fit object-top"
                                    fill
                                />
                            </div>
                            <div className={`relative w-1/3 min-w-[32%] sm:min-w-28 max-w-[148px] max-h-[124px] p-6 md:p-8 rounded-lg`}>
                                {/* Car Image */}
                                <Image
                                    src="/carseats.png"
                                    alt="Car Rental"
                                    className="object-fit object-top"
                                    fill
                                />
                            </div>

                        </div>
                    </div>
                    <div className="size-full">
                        <div className="font-bold flex h-full justify-between bg-background flex-col gap-6 rounded-lg py-6 pl-1 sm:py-6 min-h-[28.8rem]">
                            <div className="relative flex flex-col gap-2" >
                                <div className="text-xl">{details.name}</div>
                                <div className='text-xs opacity-50 flex gap-2'>
                                    <Image className="w-20" src={'/stars.png'} alt="stars-icon" width={100} height={100} />
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
                                <span className="font-bold">{details.car_type}</span>
                                <span>Capacity</span>
                                <span className="font-bold">{details.capacity}</span>
                                <span>Steering</span>
                                <span className="font-bold">{details.steering}</span>
                                <span>Gasoline</span>
                                <span className="font-bold">{details.gasoline}</span>
                            </div>


                            <div className='flex justify-between mt-6'>
                                <div className='flex flex-col'>
                                    <span className="text-2xl">{details.current_price}/  <span className='text-sm opacity-50'>day</span></span>
                                    <span className="opacity-50 line-through">{details.old_price} <span className='text-sm opacity-50'>day</span></span>
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
                <Header showViewAll text="Recent Car" />
                <div className="flex justify-start 2xl:justify-center overflow-hidden">
                    <div className="flex gap-8 py-6  max-w-[1308px] flex-wrap">

                        {carDetails.map((obj, key) => (
                            <Card key={key} data={{
                                card_type: 'mobile-now',
                                name: obj.name,
                                current_price: obj.current_price,
                                image: obj.image,
                                car_type: obj.car_type,
                                _id: obj._id,
                                heart: obj.heart,
                                icons: obj.icons,
                                old_price: obj.old_price,
                                slug: obj.slug
                            }} />
                        ))}

                    </div>
                </div>
                <Header showViewAll text="Recommendation Car" />
                <div className="flex justify-start 2xl:justify-center overflow-hidden">
                    <div className="flex gap-8 py-6  max-w-[1308px] flex-wrap">

                        {carDetails.map((obj, key) => (
                            <Card key={key} data={{
                                card_type: 'mobile-now',
                                name: obj.name,
                                current_price: obj.current_price,
                                image: obj.image,
                                car_type: obj.car_type,
                                _id: obj._id,
                                heart: obj.heart,
                                icons: obj.icons,
                                old_price: obj.old_price,
                                slug: obj.slug
                            }} />
                        ))}

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Category