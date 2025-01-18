export interface CAR {
    // API Fields
    name: string;
    type: string;
    fuel_capacity: string;
    transmission: string;
    seating_capacity: string;
    price_per_day: string;
    original_price: string;
    image: {
        _type: 'image';
        asset: {
            _type: 'reference';
            _ref: string;
        };
    };
    tags: string[];

    // Custom Fields
    heart: boolean;
    available: number;
    slug: { current: string };
    reviews: number;
    desc: string;
}