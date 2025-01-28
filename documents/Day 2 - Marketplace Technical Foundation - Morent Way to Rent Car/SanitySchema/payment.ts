export default {
    name: 'payment',
    type: 'document',
    title: 'Payment',
    fields: [
        {
            name: 'payment_id',
            type: 'string',
            title: 'Payment ID',
        },
        {
            name: 'booking',
            type: 'reference',
            title: 'Booking',
            to: [{ type: 'booking' }],
        },
        {
            name: 'user',
            type: 'reference',
            title: 'User',
            to: [{ type: 'user' }],
        },
        {
            name: 'amount',
            type: 'number',
            title: 'Amount',
        },
        {
            name: 'status',
            type: 'string',
            title: 'Payment Status',
        },
        {
            name: 'method',
            type: 'string',
            title: 'Payment Method',
        },
        {
            name: 'payment_date',
            type: 'datetime',
            title: 'Payment Date',
        },
    ],
};
