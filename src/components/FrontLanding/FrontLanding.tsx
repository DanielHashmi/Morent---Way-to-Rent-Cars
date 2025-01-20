import { CAR } from "@/types/types"
import Card from "../Card"
import CarCard from "./CarCard"
import LocationSelector from "./LocationSelector"
import Header from "../Header"
import Button from "../Button"
import Link from "next/link"
import client from "@/sanity/lib/client"
import { UsersQuery } from "@/sanity/lib/grok"

const FrontLanding = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cars`);
    const carDetails: CAR[] = await data.json();

    const users = await client.fetch(UsersQuery);

    return (
        <div className="md:px-16 px-6 py-8 bg-[#f6f7f9]">
            <div className="flex gap-6 justify-center">
                <CarCard
                    para="Ease of doing a car rental safely and reliably. Of course at a low price."
                    heading='The Best Platform for Car Rental'
                    btnColor="bg-[#3563e9]"
                    className="bg-blue-400" />

                <CarCard
                    para="Providing cheap car rental services and safe and comfortable facilities."
                    heading='Easy way to rent a car at a low price'
                    btnColor="bg-[#54a6ff]"
                    className="hidden lg:flex bg-blue-500" />
            </div>

            <LocationSelector currentPage="home" />
            <Header showViewAll tag="popular" text="Popular Car" />


            <div className="flex justify-start 2xl:justify-center mt-12 overflow-hidden">
                <div className="flex gap-8 py-6  xl:w-[82rem] overflow-x-scroll">
                    {carDetails.filter(car => car.tags && car.tags.includes('popular')).map((obj, key) => (
                        <Card key={key} data={{
                            slug: obj.slug,
                            name: obj.name,
                            price_per_day: obj.price_per_day,
                            image: obj.image,
                            type: obj.type,
                            heart: obj.heart,
                            original_price: obj.original_price,
                            available: obj.available,
                            fuel_capacity: obj.fuel_capacity,
                            seating_capacity: obj.seating_capacity,
                            tags: obj.tags,
                            transmission: obj.transmission,
                            reviews: obj.reviews,
                            desc: obj.desc,
                        }} users={users} />
                    ))}
                </div>
            </div>
            <Header showViewAll={false} tag="recommended" text="Recommendation Car" />

            <div className="flex justify-start 2xl:justify-center mt-12 overflow-hidden">
                <div className="flex gap-8 py-6 xl:w-[82rem] flex-wrap">
                    {carDetails.filter(car => car.tags && car.tags.includes('recommended')).map((obj, key) => (
                        <Card key={key} data={{
                            slug: obj.slug,
                            name: obj.name,
                            price_per_day: obj.price_per_day,
                            image: obj.image,
                            type: obj.type,
                            heart: obj.heart,
                            original_price: obj.original_price,
                            available: obj.available,
                            fuel_capacity: obj.fuel_capacity,
                            seating_capacity: obj.seating_capacity,
                            tags: obj.tags,
                            transmission: obj.transmission,
                            reviews: obj.reviews,
                            desc: obj.desc,
                        }} users={users} />
                    ))}
                </div>
            </div>


            <div className="flex justify-center mt-12">
                <div className="flex w-full justify-center relative xl:w-[82rem]">
                    <Link href={'/category'}>
                        <Button text='Show more car' classes='bg-blue-600' />
                    </Link>
                    <div className="text-sm opacity-50 absolute right-0">{carDetails.length} cars</div>
                </div>
            </div>


        </div>
    )
}

export default FrontLanding