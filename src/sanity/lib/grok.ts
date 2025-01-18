export const CardQuery = `*[_type == "car"]{
  name,
  type,
  fuel_capacity,
  transmission,
  seating_capacity,
  price_per_day,
  original_price,
  image,
  tags,
  heart,
  available,
  desc,
  reviews,
  slug,
}
`;

export const CarDetailsQuery = (slug: string) => {
  const data = `*[_type == 'car' && slug.current == '${slug}']{
  name,
  type,
  fuel_capacity,
  transmission,
  seating_capacity,
  price_per_day,
  original_price,
  image,
  tags,
  heart,
  available,
  desc,
  reviews,
  slug,
}`
  return data;
}