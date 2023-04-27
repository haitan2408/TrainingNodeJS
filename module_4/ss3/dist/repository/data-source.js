"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
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
});
//# sourceMappingURL=data-source.js.map