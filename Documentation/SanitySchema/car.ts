import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'car',
    title: 'Car',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'current_price',
            title: 'Current Price',
            type: 'string',
        }),
        defineField({
            name: 'Available',
            title: 'Available',
            type: 'number',
        }),
        defineField({
            name: 'old_price',
            title: 'Old Price',
            type: 'string',
        }),
        defineField({
            name: 'heart',
            title: 'Heart',
            type: 'boolean',
        }),
        defineField({
            name: 'car_type',
            title: 'Car Type',
            type: 'string',
        }),
        defineField({
            name: 'icons',
            title: 'Icons',
            type: 'boolean',
        }),
        defineField({
            name: 'card_type',
            title: 'Card Type',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        }),

        // Detail Page Specific Fields
        defineField({
            name: 'desc',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            }
        }),
        defineField({
            name: 'capacity',
            title: 'Capacity',
            type: 'string',
        }),
        defineField({
            name: 'steering',
            title: 'Steering',
            type: 'string',
        }),
        defineField({
            name: 'gasoline',
            title: 'Gasoline',
            type: 'string',
        }),
        defineField({
            name: 'reviews',
            title: 'Reviews',
            type: 'number',
        }),

        // Images as an array for the detail page
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
            ],
        }),
    ],
});
