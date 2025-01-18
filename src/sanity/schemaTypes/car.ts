import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'car',
    title: 'Car',
    type: 'document',
    fields: [
        // Api Fields
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'type',
            type: 'string',
            title: 'Car Type',
            description: 'Type of the car (e.g., Sport, Sedan, SUV, etc.)',
        },),
        defineField({
            name: 'fuel_capacity',
            title: 'Fuel Capacity',
            type: 'string',
            description: 'Fuel capacity or battery capacity (e.g., 90L, 100kWh)',
        }),
        defineField({
            name: 'transmission',
            title: 'Transmission',
            type: 'string',
            description: 'Type of transmission (e.g., Manual, Automatic)',
        }),
        defineField({
            name: 'seating_capacity',
            title: 'Seating Capacity',
            type: 'string',
            description: 'Number of seats (e.g., 2 People, 4 seats)',
        }),
        defineField({
            name: 'price_per_day',
            title: 'Price Per Day',
            type: 'string',
            description: 'Rental price per day',
        }),
        defineField({
            name: 'original_price',
            title: 'Original Price',
            type: 'string',
            description: 'Original price before discount (if applicable)',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Tags for categorization (e.g., popular, recommended)',
        }),

        // Custom Fields
        defineField({
            name: 'heart',
            title: 'Heart',
            type: 'boolean',
        }),
        defineField({
            name: 'available',
            title: 'Available',
            type: 'number',
        }),
        defineField({
            name: 'slug',
            title: 'SLug',
            type: 'slug',
            options: { source: 'name' }
        }),

        // Detail Page Specific Fields
        defineField({
            name: 'desc',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'reviews',
            title: 'Reviews',
            type: 'number',
        }),
    ],
});
