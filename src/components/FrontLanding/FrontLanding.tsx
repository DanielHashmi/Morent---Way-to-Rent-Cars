import { CARCARD } from "@/types/types"
import Card from "../Card"
import CarCard from "./CarCard"
import LocationSelector from "./LocationSelector"
import Header from "../Header"
import Button from "../Button"
import client from "@/sanity/lib/client"
import { CardQuery } from "@/sanity/lib/grok"
import Link from "next/link"

const FrontLanding = async () => {
    let carDetails: CARCARD[] = [];
    try {
        carDetails = await client.fetch(CardQuery);
    } catch (error) {
        console.log('No internet! or something else occurred.', error);
    }
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
            <Header showViewAll text="Popular Car" />


            <div className="flex justify-start 2xl:justify-center mt-12 overflow-hidden">
                <div className="flex gap-8 py-6  xl:w-[82rem] overflow-x-scroll">
                    {carDetails.map((obj, key) => (
                        <Card key={key} data={{
                            _id: obj._id,
                            card_type: 'mobile',
                            name: obj.name,
                            current_price: obj.current_price,
                            image: obj.image,
                            car_type: obj.car_type,
                            heart: obj.heart,
                            icons: obj.icons,
                            old_price: obj.old_price,
                            slug: obj.slug
                        }} />
                    ))}
                </div>
            </div>
            <Header showViewAll={false} text="Recommendation Car" />

            <div className="flex justify-start 2xl:justify-center mt-12 overflow-hidden">
                <div className="flex gap-8 py-6 xl:w-[82rem] flex-wrap">
                    {carDetails.map((obj, key) => (
                        <Card key={key} data={{
                            card_type: '',
                            _id: obj._id,
                            name: obj.name,
                            current_price: obj.current_price,
                            image: obj.image,
                            car_type: obj.car_type,
                            heart: obj.heart,
                            icons: obj.icons,
                            old_price: obj.old_price,
                            slug: obj.slug
                        }} />
                    ))}
                    {carDetails.map((obj, key) => (
                        <Card key={key} data={{
                            card_type: '',
                            _id: obj._id,
                            name: obj.name,
                            current_price: obj.current_price,
                            image: obj.image,
                            car_type: obj.car_type,
                            heart: obj.heart,
                            icons: obj.icons,
                            old_price: obj.old_price,
                            slug: obj.slug
                        }} />
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