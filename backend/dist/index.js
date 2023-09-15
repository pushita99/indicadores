"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const binnacle_entity_1 = require("./binnacle/entities/binnacle.entity");
const company_entity_1 = require("./company/entities/company.entity");
const direction_entity_1 = require("./direction/entities/direction.entity");
const indicator_entity_1 = require("./indicator/entities/indicator.entity");
const indicatorcompanydirection_entity_1 = require("./indicatorcompanydirection/entities/indicatorcompanydirection.entity");
const measurementunit_entity_1 = require("./measurementunit/entities/measurementunit.entity");
const planification_entity_1 = require("./planification/entities/planification.entity");
const security_entity_1 = require("./security/entities/security.entity");
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "indicadores",
    entities: [binnacle_entity_1.Binnacle, company_entity_1.Company, direction_entity_1.Direction, indicator_entity_1.Indicator, indicatorcompanydirection_entity_1.Indicatorcompanydirection, measurementunit_entity_1.Measurementunit, planification_entity_1.Planification, security_entity_1.Security],
    synchronize: true,
    logging: false,
});
AppDataSource.initialize()
    .then(() => {
})
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map