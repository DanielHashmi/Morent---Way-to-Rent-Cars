'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import { CAR } from "@/types/types";
import Card from "../Card";
import client from "@/sanity/lib/client";
import { UsersQuery } from "@/sanity/lib/grok";

type Filters = {
    name: boolean;
    type: boolean;
    price: boolean;
    tags: boolean;
    transmission: boolean;
    seats: boolean;
    reviews: boolean;
};

export default function SearchBar() {
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [carDetails, setCarDetails] = useState<CAR[]>([]);
    const [showAdvanceFilter, setShowAdvanceFilter] = useState<boolean>(false);
    const [users, setUsers] = useState([])
    const [filters, setFilters] = useState<Filters>({
        name: true,
        type: true,
        price: false,
        tags: false,
        transmission: false,
        seats: false,
        reviews: false
    });


    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cars`)
            .then(response => response.json())
            .then(data => setCarDetails(data))
            .catch(error => console.log(error));

        const getUsers = async () => {
            let users_data = [];
            try {
                users_data = await client.fetch(UsersQuery);
                setUsers(users_data)

            } catch (error) {
                console.log(error);
            }
        };
        getUsers();
        document.addEventListener('click', (e) => {
            if (!((e.target as HTMLElement).classList.contains('advanceFilter'))) {
                setShowAdvanceFilter(false);
            }
        })
    }, []);

    const handleFilterChange = (filterName: keyof Filters) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: !prevFilters[filterName]
        }));
    };

    let filteredCars: CAR[] = [];
    if (carDetails.length) {
        filteredCars = carDetails.filter((car) => (
            `${filters.name ? car.name : ''} 
             ${filters.type ? car.type : ''} 
             ${filters.price ? car.price_per_day : ''} 
             ${filters.tags ? car.tags : ''} 
             ${filters.transmission ? car.transmission : ''} 
             ${filters.seats ? car.seating_capacity : ''} 
             ${filters.reviews ? car.reviews : ''}`
                .toLowerCase().includes(search.toLowerCase())
        ));
    }

    return (
        <div className="flex items-center relative w-full gap-4 lg:max-w-lg md:px-5 md:py-3 md:border rounded-lg md:rounded-full bg-white shadow-sm">
            <div className="flex items-center w-full px-5 py-3 md:p-0 border md:border-0 rounded-lg md:rounded-full bg-white shadow-sm">
                <Image src={'/search.png'} alt="logo" width={100} height={100} className="size-6" />
                <input
                    onBlur={() => setTimeout(() => setShowSearch(false), 100)}
                    onFocus={() => setShowSearch(true)}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search a car here"
                    className="flex-1 px-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                />
            </div>
            <button
                onClick={() => setShowAdvanceFilter(!showAdvanceFilter)}
                className={`border md:border-0 p-3 md:p-0 rounded-lg md:rounded-none ${!showAdvanceFilter && 'opacity-70'} advanceFilter`}>
                <Image src={'/filter.png'} alt="logo" width={100} height={100} className="size-6 min-w-6 advanceFilter" />
            </button>

            {/* search results */}
            {showSearch && (
                <div className={`bg-[#f6f7f9] p-6 flex flex-wrap gap-6 shadow-xl rounded-xl max-h-[27rem] min-w-[304px] center w-min ${filteredCars.length && 'lg:w-[43rem]'} top-16 z-50 absolute overflow-y-auto`}>
                    {filteredCars.map((car, index) => (
                        <Card
                            key={index}
                            data={{
                                slug: car.slug,
                                name: car.name,
                                price_per_day: car.price_per_day,
                                image: car.image,
                                type: car.type,
                                heart: car.heart,
                                original_price: car.original_price,
                                available: car.available,
                                fuel_capacity: car.fuel_capacity,
                                seating_capacity: car.seating_capacity,
                                tags: car.tags,
                                transmission: car.transmission,
                                desc: car.desc,
                                reviews: car.reviews,
                            }} users={users}
                        />
                    ))}
                    <div className="text-center w-full text-gray-400 text-nowrap">You caught all for now!</div>
                </div>
            )}

            {/* advance filters */}
            {showAdvanceFilter && (
                <div className="bg-[#f6f7f9] p-6 flex advanceFilter flex-wrap gap-6 shadow-xl rounded-xl max-w-sm max-h-[27rem] top-16 z-50 absolute overflow-y-auto">
                    {Object.keys(filters).map((filter) => (
                        <div
                            key={filter}
                            onClick={() => handleFilterChange(filter as keyof Filters)}
                            className="advanceFilter flex gap-2 cursor-pointer">
                            <input type="checkbox" className="cursor-pointer advanceFilter" checked={filters[filter as keyof Filters]} readOnly />
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
