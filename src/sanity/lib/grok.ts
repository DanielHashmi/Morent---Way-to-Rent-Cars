export const CardQuery = `*[_type == "car"]{
    name,
    type,
    fuel_capacity,
    transmission,
    seating_capacity,
    price_per_day,
    original_price,
    tags,
    heart,
    available,
    slug,
    gallery,
    rating,
    desc,
    reviews
}`;

export const CarDetailsQuery = (slug: string) => {
  const data = `*[_type == 'car' && slug.current == '${slug}']{
    name,
    type,
    fuel_capacity,
    transmission,
    seating_capacity,
    price_per_day,
    original_price,
    tags,
    heart,
    available,
    slug,
    gallery,
    rating,
    desc,
    reviews
}`
  return data;
}

export const UsersQuery = `*[_type == 'user']{name,email,image,favorites,role,notifications}`;