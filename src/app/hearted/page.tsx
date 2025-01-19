import Card from "@/components/Card";
import { CAR } from "@/types/types";

const Hearted = async () => {
  let carDetails: CAR[] = [];
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cars`)
    carDetails = (await data.json()).filter((car: CAR) => car.heart);
  } catch (error) {
    console.log('No internet! or something else occurred 2.', error);
  }
  if (!carDetails) {
    return
  }
  return (
    <div className="flex flex-col items-center bg-[#f6f7f9]">
      <h1 className="text-center text-2xl text-[#3563e9] font-bold pt-6">Favorites</h1>

      <div className="flex gap-8 px-6 py-6 xl:w-[82rem] flex-wrap justify-center">
        {!carDetails.length ? <div className="py-20">No Favorite cars!</div> : carDetails.map((obj, key) => (
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
            desc: obj.desc
          }} />
        ))}
      </div>
    </div>
  )
}

export default Hearted