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
    tags: string[];

    // Custom Fields
    heart: boolean;
    available: number;
    slug: { current: string };
    reviews: number;
    desc: string;
    rating: number;
    gallery: SanityImage[];
}

export interface USER {
    name: string;
    email: string;
    image?: string;
    favorites: string[];
    role: string;
    notifications: { name: string; text: string }[];
}


// input fields properties
export interface INPUT_FIELD_PROPS {
    errors: Record<string, string>;
    label: string;
    id: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

// Payment and shipping form data interface 
export interface SHIPMENT_PAYMENT_FORM_DATA {
    name: string;
    address: string;
    phone: string;
    city: string;
    pickUpLocation: string;
    pickUpTime: string;
    pickUpDate: string;
    dropOffLocation: string;
    dropOffTime: string;
    dropOffDate: string;
    totelPrice: number;
    carName: string;
    terms: boolean;
}


// Payment
export interface PAYMENT {
    client_secret: string;
    car_slug: string;
    user_email: string;
    amount: number;
    status: string;
    method: string;
    payment_date: string;
}

// Booking
export interface BOOKING {
    user_name: string;
    payment_intent: string;
    user_address: string;
    user_phone: string;
    user_email: string;
    car_name: string;
    drop_off_location: string;
    total_price: number;
    city: string;
    pick_up_location: string;
    pick_up_time: string;
    pick_up_date: string;
    drop_off_time: string;
    drop_off_date: string;
    terms: boolean;
}

