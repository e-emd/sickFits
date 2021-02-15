import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import 'dotenv/config';
import { User } from './schemas/User';
import { Product } from './schemas/Product';

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
        // TODO: add data seeding here
    },
    lists: createSchema({
        // Schema items go in here
        User,
        Product
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