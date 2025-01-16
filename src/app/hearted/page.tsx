import Card from "@/components/Card";
import client from "@/sanity/lib/client";
import { CardQuery } from "@/sanity/lib/grok";
import { CARCARD } from "@/types/types";

const Hearted = async () => {
  let carDetails: CARCARD[] = [];
  try {
    carDetails = (await client.fetch(CardQuery)).filter((car: CARCARD) => car.heart);
  } catch (error) {
    console.log('No internet! or something else occurred.', error);
  }

  return (
    <div className="flex flex-col items-center bg-[#f6f7f9]">
      <h1 className="text-center text-2xl text-[#3563e9] font-bold pt-6">Favorites</h1>

      <div className="flex gap-8 px-6 py-6 xl:w-[82rem] flex-wrap justify-center">
        {!carDetails.length ? <div className="py-20">No Favorite cars!</div> : carDetails.map((obj, key) => (
          <Card key={key} data={{
            card_type: 'mobile',
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
  )
}

export default Hearted