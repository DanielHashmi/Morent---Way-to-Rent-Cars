export const CardQuery = `*[_type == 'car']{
  slug{
    current
  },
  name,
  _id,
  current_price,
  old_price,
  car_type,
  card_type,
  icons,
  heart,
  image,
}`;

export const CarDetailsQuery = (slug: string) => {
  const data = `*[_type == 'car' && slug.current == '${slug}']{
  name,
  _id,
  capacity,
  reviews,
  slug{current},
  car_type,
  desc,
  old_price,
  current_price,
  gasoline,
  steering,
  heart,
  image,
}`
  return data;
}