export default {
    name: 'booking',
    type: 'document',
    title: 'Booking',
    fields: [
        {
            name: 'user_name',
            type: 'string',
            title: 'User Name',
        },
        {
            name: 'user_address',
            type: 'string',
            title: 'User Address',
        },
        {
            name: 'user_phone',
            type: 'string',
            title: 'User Phone',
        },
        {
            name: 'user_email',
            type: 'string',
            title: 'User Email',
        },
        {
            name: 'car',
            type: 'reference',
            title: 'Car',
            to: [{ type: 'car' }],
        },
        {
            name: 'drop-off-location',
            type: 'string',
            title: 'Drop-Off Location',
        },
        {
            name: 'rent_start_date',
            type: 'string',
            title: 'Rent Start Date',
        },
        {
            name: 'rent_end_date',
            type: 'string',
            title: 'Rent End Date',
        },
        {
            name: 'total_price',
            type: 'number',
            title: 'Total Price',
        },
    ],
};
