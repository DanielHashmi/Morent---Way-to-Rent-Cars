import Card from "@/components/Card";
import client from "@/sanity/lib/client";
import { UsersQuery } from "@/sanity/lib/grok";
import { CAR, USER } from "@/types/types";
import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/authOptions";

const Favorites = async () => {
  const session = await getServerSession(authOption)
  let carDetails: CAR[] = [];
  let users: USER[] = []
  let user: USER | undefined = undefined;
  try {
    users = await client.fetch(UsersQuery);
    user = users.find(user => user.email === session?.user?.email);
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cars`);
    carDetails = (await data.json()).filter((car: CAR) => user?.favorites.includes(car.slug.current));
  } catch (error) {
    console.log('No internet! or something else occurred 2.', error);
  }
  return (
    <div className="flex flex-col items-center bg-[#f6f7f9]">
      <h1 className="text-center text-2xl text-[#3563e9] font-bold pt-6">Favorites</h1>

      <div className="flex gap-8 px-6 py-6 xl:w-[82rem] flex-wrap justify-center">
        {!carDetails.length ? <div className="flex justify-center items-center h-[50vh]">
          You haven&apos;t added any favorite cars!
        </div> : carDetails.map((car, key) => (
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
  )
}

export default Favorites