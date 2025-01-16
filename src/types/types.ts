export interface CARCARD {
    name: string;
    current_price: string;
    old_price: string;
    image: string | null;
    heart: boolean;
    car_type: string;
    icons: boolean;
    _id: string;
    slug?: { current: string },
    card_type: string;
}
export interface DETAILPAGE {
    name: string;
    capacity: string;
    reviews: number;
    slug: { current: string };
    car_type: string;
    desc: string;
    old_price: string;
    current_price: string;
    gasoline: string;
    steering: string;
    heart: boolean;
    image: string | null;
    _id: string;
}