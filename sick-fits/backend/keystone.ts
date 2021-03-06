import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import 'dotenv/config';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';

const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorials';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // how long they stay logged in?
    secret: process.env.COOKIE_SECRET
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password',],
        // TODO: add in initial roles here
    }
})

export default withAuth(config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true
        },
    },
    db: {
        adapter: 'mongoose',
        url: databaseUrl,
        async onConnect(keystone) {
            console.log('Connected to database');
            if (process.argv.includes('--seed-data')) {
             await insertSeedData(keystone);   
            }
        }
    },
    lists: createSchema({
        // Schema items go in here
        User,
        Product,
        ProductImage
    }),
    ui: {
        // Show the UI only for people who pass this tests
        isAccessAllowed: ({ session }) => {
            console.log(session);
            return !!session?.data;
        },
    },
    session: withItemData(statelessSessions(sessionConfig), {
        User: `id`
    })
}));