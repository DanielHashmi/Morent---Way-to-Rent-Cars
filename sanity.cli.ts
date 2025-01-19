import * as dotenv from 'dotenv'
dotenv.config()

import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
    api: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    },
    studioHost: 'morent-way-to-rent-car',
});
