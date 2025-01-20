import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'url',
        }),
        defineField({
            name: 'phone',
            title: 'Phone',
            type: 'string',
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
            options: { 'list': ['Admin', 'User'] },
        }),
        defineField({
            name: 'notification',
            title: 'Notification',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'favorites',
            title: 'Favorites',
            type: 'array',
            of: [{ type: 'string' }],
        }),
    ],
});