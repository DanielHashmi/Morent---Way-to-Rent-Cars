import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'shipment',
    title: 'Shipment',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'phone',
            title: 'Phone',
            type: 'string',
        }),
        defineField({
            name: 'address',
            title: 'Address',
            type: 'string',
        }),
        defineField({
            name: 'city',
            title: 'City',
            type: 'string',
        }),
        defineField({
            name: 'state_province',
            title: 'State/Province',
            type: 'string',
        }),
        defineField({
            name: 'postal_code',
            title: 'Postal Code',
            type: 'string',
        }),
        defineField({
            name: 'country_code',
            title: 'Country Code',
            type: 'string',
        }),
        defineField({
            name: 'user_email',
            title: 'User Email',
            type: 'string',
        }),
        defineField({
            name: 'payment_intent',
            title: 'Payment Intent',
            type: 'string',
        }),
        defineField({
            name: 'car_slug',
            title: 'Car Slug',
            type: 'string',
        }),
    ],
});