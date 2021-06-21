import { ConnectionOptions } from "typeorm";
import anvData from './common/config';

const { POSTGRES_PORT, 
    POSTGRES_USER, 
    POSTGRES_PASSWORD, 
    POSTGRES_DB,
    POSTGRES_HOST
} = anvData;


const config: ConnectionOptions = {
    type: 'postgres',
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    username: POSTGRES_USER, // databse login role username
    password: POSTGRES_PASSWORD, // database login role password
    database: POSTGRES_DB, // db name
    // autoReconnect: true,
    // reconnectTries: 1000,
    // reconnectInterval: 10000,
    connectTimeoutMS: 60000,

    // entities name should be **.entity.ts
    entities: [`${__dirname}/resources/**/*.model.ts`],

    // We are using migrations, synchronize should be set to false.
    // synchronize: process.env.TYPEORM_SYNCHRONIZE
    //  ? process.env.TYPEORM_SYNCHRONIZE.toLowerCase() === 'true'
    //  : false,
    synchronize: false,

    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    migrationsRun: true,

 //    logging: false,
    // logger: 'advanced-console',

    // Allow both start:prod and start:dev to use migrations
    // __dirname is either dist or src folder, meaning either
    // the compiled js in prod or the ts in dev.
    migrations: [`${__dirname}/src/migration/*{.ts,.js}`],
    cli: {
      migrationsDir: 'src/migration'
    },
};
export default config;