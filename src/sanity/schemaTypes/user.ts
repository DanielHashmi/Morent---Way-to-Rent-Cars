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
            type: 'string',
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
            options: { 'list': ['Admin', 'User'] },
        }),
        defineField({
            name: 'favorites',
            title: 'Favorites',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'notifications',
            title: 'Notifications',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Name', type: 'string' },
                        { name: 'text', title: 'Text', type: 'string' },
                    ],
                },
            ],
        }),
    ],
});