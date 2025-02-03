'use client'
import Button from "@/components/Button"
import Card from "@/components/Card"
import CapacityFilter from "@/components/Category/CapacityFilter"
import TypeFilter from "@/components/Category/TypeFilter"
import LocationSelector from "@/components/FrontLanding/LocationSelector"
import client from "@/sanity/lib/client"
import { UsersQuery } from "@/sanity/lib/grok"
import { CAR, USER } from "@/types/types"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

const CategoryComponent = () => {
    const [carDetails, setCarDetails] = useState<CAR[]>([]);
    const [filteredCars, setFilteredCars] = useState<CAR[]>([]);
    const [more, setMore] = useState(6);
    const searchParams = useSearchParams();
    const tag = searchParams.get('tag') || ' ';
    const [users, setUsers] = useState<USER[]>([])

    useEffect(() => {
        const getData = async () => {
            let data;
            let users;
            try {
                data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cars`);
                data = await data.json();
                users = await client.fetch(UsersQuery);
                setCarDetails(data);
                setFilteredCars(data);
                setUsers(users)
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    const setCategory = (types: string[]) => {
        const filtered = carDetails.filter(car => (types.includes(car.type) || types.includes(car.seating_capacity)));
        setFilteredCars(filtered.length ? filtered : carDetails);
    };

    return (
        <div className="flex justify-between">
            <div className="min-w-72 border-t hidden lg:flex flex-col p-6 gap-6">
                <div className="text-xs opacity-50">TYPE</div>

                <TypeFilter carDetails={carDetails.filter(car => car.tags && car.tags[0] + ' '.includes(tag))} setCategory={setCategory} />

                <div className="text-xs opacity-50">CAPACITY</div>

                <CapacityFilter carDetails={carDetails.filter(car => car.tags && car.tags[0] + ' '.includes(tag))} setCategory={setCategory} />

                <div className="text-xs opacity-50">PRICE</div>


                <div className="flex gap-2 items-start flex-col">
                    <Image className="w-full" src='/seekbar.svg' alt="checkbox-icon" width={100} height={100} />
                    Max. $100.00
                </div>
            </div>
            <div className="md:px-16 px-6 py-8 bg-[#f6f7f9] w-full">
                <LocationSelector currentPage={'category'} />


                <div className="flex justify-start 2xl:justify-center overflow-hidden">
                    <div className="flex gap-8 py-6 justify-center flex-wrap">
                        {
                            filteredCars.filter(car => car.tags && car.tags[0] + ' '.includes(tag)).slice(0, more).length ?
                                filteredCars.filter(car => car.tags && car.tags[0] + ' '.includes(tag)).slice(0, more).map((car, key) => (
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
                                )) : <div className="flex items-center justify-center text-center text-xs opacity-50 h-[388px] min-w-[304px] rounded-lg bg-white animate-pulse">Please wait or check you connection!</div>
                        }
                    </div>
                </div>


                <div className="flex justify-center mt-12">
                    <div className="flex w-full justify-center relative max-w-[1308px]">
                        <button onClick={() => setMore(more + 3)}>
                            <Button text='Show more car' classes='bg-blue-600' />
                        </button>
                        <div className="text-sm opacity-50 absolute right-0">{carDetails.filter(car => car.tags && car.tags[0] + ' '.includes(tag)).length || 0} cars</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

const Category = () => {
    return (
        <Suspense>
            <CategoryComponent />
        </Suspense>
    )
}

export default Category