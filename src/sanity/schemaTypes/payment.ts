const payment = {
    name: 'payment',
    type: 'document',
    title: 'Payment',
    fields: [
        {
            name: 'client_secret',
            type: 'string',
            title: 'Client Secret',
        },
        {
            name: 'car_slug',
            type: 'string',
            title: 'Car Slug',
        },
        {
            name: 'user_email',
            type: 'string',
            title: 'User Email',
        },
        {
            name: 'amount',
            type: 'number',
            title: 'Amount',
        },
        {
            name: 'status',
            type: 'string',
            title: 'Status',
        },
        {
            name: 'method',
            type: 'string',
            title: 'Payment Method',
        },
        {
            name: 'payment_date',
            type: 'string',
            title: 'Payment Date',
        },
    ],
};
export default payment;