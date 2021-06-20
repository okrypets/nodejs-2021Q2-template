import { ConnectionOptions } from "typeorm";
import anvData from './config';

const { POSTGRES_PORT, 
    POSTGRES_USER, 
    POSTGRES_PASSWORD, 
    POSTGRES_DB,
} = anvData;


export const config = {
    type: 'postgres',
    host: "host.docker.internal", // localhost
    port: POSTGRES_PORT,
    username: POSTGRES_USER, // databse login role username
    password: POSTGRES_PASSWORD, // database login role password
    database: POSTGRES_DB, // db name
    autoReconnect: true,
    reconnectTries: 1000,
    reconnectInterval: 10000,

    // entities name should be **.entity.ts
   entities: [__dirname + '/**/*.entity{.ts,.js}'],

    // We are using migrations, synchronize should be set to false.
    // synchronize: process.env.TYPEORM_SYNCHRONIZE
    //  ? process.env.TYPEORM_SYNCHRONIZE.toLowerCase() === 'true'
    //  : false,
    synchronize: true,

    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
  //   migrationsRun: false,

 //    logging: false,
    // logger: 'advanced-console',

    // Allow both start:prod and start:dev to use migrations
    // __dirname is either dist or src folder, meaning either
    // the compiled js in prod or the ts in dev.
 //    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    // cli: {
    //     // Location of migration should be inside src folder
    //     // to be compiled into dist/ folder.
    //     migrationsDir: 'src/database/migrations'
    // }
} as ConnectionOptions;