'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { CAR } from "@/types/types";
import Card from "../Card";

export default function SearchBar() {
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState('');
    const [carDetails, setCarDetails] = useState<CAR[]>([])

    useEffect(() => {
        const getData = async () => {
            const raw_data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cars`);
            const data: CAR[] = await raw_data.json();
            setCarDetails(data);
        };
        getData()
    }, []);

    return (
        <div className="flex items-center relative w-full gap-4 lg:max-w-lg md:px-5 md:py-3 md:border rounded-lg md:rounded-full bg-white shadow-sm">
            <div className="flex items-center w-full px-5 py-3 md:p-0 border md:border-0 rounded-lg md:rounded-full bg-white shadow-sm">
                <button>
                    <Image src={'/search.png'} alt="logo" width={100} height={100} className="size-6" />
                </button>
                <input
                    onBlur={() => { setTimeout(() => { setShowSearch(false) }, 100) }}
                    onFocus={() => setShowSearch(true)}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search a car here"
                    className="flex-1 px-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                />
            </div>
            <button className="border md:border-0 p-3 md:p-0 rounded-lg md:rounded-none">
                <Image src={'/filter.png'} alt="logo" width={100} height={100} className="size-6" />
            </button>

            {/* search place */}

            {showSearch && <div className="bg-[#f6f7f9] p-6 flex flex-wrap gap-6 shadow-xl rounded-xl max-h-[27rem] min-w-[304px] w-min lg:w-[43rem] top-16 z-50 absolute overflow-y-auto">
                {carDetails.filter((obj) => (obj.name.toLowerCase().includes(search) || obj.type.toLowerCase().includes(search))).map((obj, key) => (
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
                        desc: obj.desc,
                        reviews: obj.reviews,
                    }} />
                ))}
                <div className="text-center w-full text-gray-400 text-nowrap">You caught all for now!</div>
            </div>}
        </div>
    );
}
