import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'tracking',
    title: 'Tracking',
    type: 'document',
    fields: [
        defineField({
            name: 'tracking_number',
            title: 'Tracking Number',
            type: 'string',
        }),
        defineField({
            name: 'label_id',
            title: 'Label ID',
            type: 'string',
        }),
        defineField({
            name: 'carrier',
            title: 'Carrier',
            type: 'string',
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
        }),
        defineField({
            name: 'estimated_delivery_date',
            title: 'Estimated Delivery Date',
            type: 'string'
        }),
        defineField({
            name: 'payment_intent',
            title: 'Payment Intent',
            type: 'string'
        }),
        defineField({
            name: 'amount',
            title: 'Amount',
            type: 'number'
        }),
    ]
});
