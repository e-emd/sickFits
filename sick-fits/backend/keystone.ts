import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';

const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorials';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // how long they stay logged in?
    secrete: process.env.COOKIE_SECRETE
};

export default config({
     server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true
        },
    },
    db: {
        adapter: 'mongoose',
        url: databaseUrl,
        // TODO: add data seeding here
    },
    lists: createSchema({
        // Schema items go in here
    }),
    ui: {
        // TODO: change this for roles
        isAccessAllowed: () => true,
    },
    // TODO: Add session values here
})