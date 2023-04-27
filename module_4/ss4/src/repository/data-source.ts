import "reflect-metadata"

import {DataSource} from "typeorm"


export const AppDataSource = new DataSource({

    type: "mysql",

    host: "localhost",

    port: 3306,

    username: "root",

    password: "28101998",

    database: "training_nodejs",

    synchronize: false,

    logging: false,

    entities: ["dist/entity/*.js"],

    migrations: ["dist/migrations/*.js"],

})
