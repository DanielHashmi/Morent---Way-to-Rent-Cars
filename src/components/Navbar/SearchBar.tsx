'use client'
import Image from "next/image";
import { useState } from "react";
import { CARCARD } from "@/types/types";
import client from "@/sanity/lib/client";
import { CardQuery } from "@/sanity/lib/grok";
import Card from "../Card";

export default function SearchBar() {
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState('');
    const [carDetails, setCarDetails] = useState<CARCARD[]>([])

    client.fetch(CardQuery).then((data) => setCarDetails(data)).catch((error) => {
        console.log('No internet! or something else occurred.', error);
    })

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
                {carDetails.filter((obj) => (obj.name.toLowerCase().includes(search) || obj.car_type.toLowerCase().includes(search))).map((obj, key) => (
                    <Card key={key} data={{
                        card_type: 'mobile',
                        name: obj.name,
                        _id: obj._id,
                        current_price: obj.current_price,
                        image: obj.image,
                        car_type: obj.car_type,
                        heart: obj.heart,
                        icons: obj.icons,
                        old_price: obj.old_price,
                        slug: obj.slug
                    }} />
                ))}
                <div className="text-center w-full text-gray-400 text-nowrap">You caught all for now!</div>
            </div>}
        </div>
    );
}
