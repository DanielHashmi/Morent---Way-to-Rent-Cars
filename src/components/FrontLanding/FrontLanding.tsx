import { CAR, USER } from "@/types/types";
import Card from "../Card";
import CarCard from "./CarCard";
import LocationSelector from "./LocationSelector";
import Header from "../Header";
import Button from "../Button";
import Link from "next/link";
import client from "@/sanity/lib/client";
import { UsersQuery } from "@/sanity/lib/grok";

type CarFilterTag = "popular" | "recommended";

const fetchCarDetails = async (): Promise<CAR[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cars`);
    if (!response.ok) {
        throw new Error("Failed to fetch car details");
    }
    return response.json();
};

const fetchUsers = async (): Promise<USER[]> => {
    return client.fetch(UsersQuery);
};

const renderCarCards = (
    carDetails: CAR[],
    users: USER[],
    tag: CarFilterTag,
    emptyMessage: string
) => {
    const filteredCars = carDetails.filter((car) => {
        if (!Array.isArray(car.tags)) {
            console.warn(`Invalid tags for car: ${car.name || "Unknown car"}`);
            return false;
        }
        return car.tags?.includes(tag);
    });

    if (filteredCars.length === 0) {
        return (
            <div className="flex items-center justify-center text-center text-xs opacity-50 h-[388px] min-w-[304px] rounded-lg bg-white animate-pulse">
                {emptyMessage}
            </div>
        );
    }

    return filteredCars.map((car, index) => (
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
                reviews: car.reviews,
                desc: car.desc,
            }}
            users={users}
        />
    ));
};


const FrontLanding = async (): Promise<JSX.Element> => {
    let carDetails: CAR[] = [];
    let users: USER[] = [];

    try {
        [carDetails, users] = await Promise.all([fetchCarDetails(), fetchUsers()]);
    } catch (error) {
        console.error(error);
        return <div>Oops! Something went wrong.</div>;
    }

    return (
        <div className="md:px-16 px-6 py-8 bg-[#f6f7f9]">
            {/* Hero Section */}
            <div className="flex gap-6 justify-center">
                <CarCard
                    para="Ease of doing a car rental safely and reliably. Of course at a low price."
                    heading="The Best Platform for Car Rental"
                    btnColor="bg-[#3563e9]"
                    className="bg-blue-400"
                />
                <CarCard
                    para="Providing cheap car rental services and safe and comfortable facilities."
                    heading="Easy way to rent a car at a low price"
                    btnColor="bg-[#54a6ff]"
                    className="hidden lg:flex bg-blue-500"
                />
            </div>

            {/* Location Selector */}
            <LocationSelector currentPage="home" />

            {/* Popular Cars */}
            <Header showViewAll tag="popular" text="Popular Car" />
            <div className="flex justify-start 2xl:justify-center mt-12 overflow-hidden">
                <div className="flex gap-8 py-6 xl:w-[82rem] overflow-x-scroll">
                    {renderCarCards(
                        carDetails,
                        users,
                        "popular",
                        "Please wait or check your connection!"
                    )}
                </div>
            </div>

            {/* Recommended Cars */}
            <Header showViewAll={false} tag="recommended" text="Recommendation Car" />
            <div className="flex justify-start 2xl:justify-center mt-12 overflow-hidden">
                <div className="flex gap-8 py-6 xl:w-[82rem] flex-wrap">
                    {renderCarCards(
                        carDetails,
                        users,
                        "recommended",
                        "Please wait or check your connection!"
                    )}
                </div>
            </div>

            {/* Footer Section */}
            <div className="flex justify-center mt-12">
                <div className="flex w-full justify-center relative xl:w-[82rem]">
                    <Link href="/category">
                        <Button text="Show more cars" classes="bg-blue-600" />
                    </Link>
                    <div className="text-sm opacity-50 absolute right-0">
                        {carDetails.length || 0} cars
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrontLanding;
