interface SanityImage {
    _type: 'image';
    asset: {
        _type: 'reference';
        _ref: string;
    };
}

export interface CAR {
    // API Fields
    name: string;
    type: string;
    fuel_capacity: string;
    transmission: string;
    seating_capacity: string;
    price_per_day: string;
    original_price: string;
    image: SanityImage;
    tags: string[];

    // Custom Fields
    heart: boolean;
    available: number;
    slug: { current: string };
    reviews: number;
    desc: string;
}

export interface USER {
    name: string;
    email: string;
    image?: string;
    favorites: string[];
    role: string;
    notifications: string[];
}
