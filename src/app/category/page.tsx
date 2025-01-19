// 'use client'
// import Button from "@/components/Button"
// import Card from "@/components/Card"
// import TypeFilter from "@/components/Category/TypeFilter"
// import LocationSelector from "@/components/FrontLanding/LocationSelector"
// import { CAR } from "@/types/types"
// import Image from "next/image"
// import Link from "next/link"
// import { useEffect, useState } from "react"

// const Category = () => {
//     const [carDetails, setCarDetails] = useState<CAR[]>([]);
//     const [filteredCars, setFilteredCars] = useState<CAR[]>([]);

//     useEffect(() => {
//         const getData = async () => {
//             const raw_data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cars`);
//             const data: CAR[] = await raw_data.json();
//             setCarDetails(data);
//             setFilteredCars(data);
//         };
//         getData();
//     }, []);

//     const setCategory = (types: string[]) => {
//         const filtered = carDetails.filter(car => types.includes(car.type));
//         setFilteredCars(filtered.length ? filtered : carDetails);
//     };

//     return (
//         <div className="flex justify-between ">
//             <div className="min-w-72 border-t hidden lg:flex flex-col p-6 gap-6">
//                 <div className="text-xs opacity-50">TYPE</div>

//                 <TypeFilter carDetails={carDetails} setCategory={setCategory} />

//                 <div className="text-xs opacity-50">CAPACITY</div>

//                 <div className="flex gap-2 items-center">
//                     <Image className="size-6" src='/checkbox.svg' alt="checkbox-icon" width={100} height={100} />
//                     2 Person <span className="opacity-50">(12)</span>
//                 </div>
//                 <div className="flex gap-2 items-center">
//                     <Image className="size-6" src='/uncheckedbox.svg' alt="checkbox-icon" width={100} height={100} />
//                     4 Person <span className="opacity-50">(12)</span>
//                 </div>
//                 <div className="flex gap-2 items-center">
//                     <Image className="size-6" src='/uncheckedbox.svg' alt="checkbox-icon" width={100} height={100} />
//                     6 Person <span className="opacity-50">(12)</span>
//                 </div>
//                 <div className="flex gap-2 items-center">
//                     <Image className="size-6" src='/checkbox.svg' alt="checkbox-icon" width={100} height={100} />
//                     8 Person <span className="opacity-50">(12)</span>
//                 </div>

//                 <div className="text-xs opacity-50">PRICE</div>


//                 <div className="flex gap-2 items-start flex-col">
//                     <Image className="w-full" src='/seekbar.svg' alt="checkbox-icon" width={100} height={100} />
//                     Max. $100.00
//                 </div>
//             </div>
//             <div className="md:px-16 px-6 py-8 bg-[#f6f7f9] w-full">
//                 <LocationSelector currentPage={'category'} />


//                 <div className="flex justify-start 2xl:justify-center overflow-hidden">
//                     <div className="flex gap-8 py-6 justify-center flex-wrap">
//                         {filteredCars.map((obj, key) => (
//                             <Card key={key} data={{
//                                 slug: obj.slug,
//                                 name: obj.name,
//                                 price_per_day: obj.price_per_day,
//                                 image: obj.image,
//                                 type: obj.type,
//                                 heart: obj.heart,
//                                 original_price: obj.original_price,
//                                 available: obj.available,
//                                 fuel_capacity: obj.fuel_capacity,
//                                 seating_capacity: obj.seating_capacity,
//                                 tags: obj.tags,
//                                 transmission: obj.transmission,
//                                 reviews: obj.reviews,
//                                 desc: obj.desc,
//                             }} />
//                         ))}
//                     </div>
//                 </div>


//                 <div className="flex justify-center mt-12">
//                     <div className="flex w-full justify-center relative max-w-[1308px]">
//                         <Link href={'/category'}>
//                             <Button text='Show more car' classes='bg-blue-600' />
//                         </Link>
//                         <div className="text-sm opacity-50 absolute right-0">{carDetails.length} cars</div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default Category

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page