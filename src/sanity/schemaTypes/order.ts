export default {
    name: 'carRentalOrder',
    type: 'document',
    title: 'Car Rental Order',
    fields: [
        {
            name: 'orderId',
            type: 'string',
            title: 'Order ID',
        },
        {
            name: 'customerName',
            type: 'string',
            title: 'Customer Name',
        },
        {
            name: 'customerEmail',
            type: 'email',
            title: 'Customer Email',
        },
        {
            name: 'car',
            type: 'reference',
            title: 'Car',
            to: [{ type: 'car' }],
        },
        {
            name: 'rentalStartDate',
            type: 'datetime',
            title: 'Rental Start Date',
        },
        {
            name: 'rentalEndDate',
            type: 'datetime',
            title: 'Rental End Date',
        },
        {
            name: 'totalPrice',
            type: 'number',
            title: 'Total Price',
        },
        {
            name: 'orderStatus',
            type: 'string',
            title: 'Order Status',
            options: {
                list: [
                    { title: 'Pending', value: 'pending' },
                    { title: 'Confirmed', value: 'confirmed' },
                    { title: 'Cancelled', value: 'cancelled' },
                    { title: 'Completed', value: 'completed' },
                ],
            },
        },
        {
            name: 'createdAt',
            type: 'datetime',
            title: 'Created At',
        },
    
    ],
};
