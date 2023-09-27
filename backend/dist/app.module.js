"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const security_module_1 = require("./security/security.module");
const direction_module_1 = require("./direction/direction.module");
const measurementunit_module_1 = require("./measurementunit/measurementunit.module");
const company_module_1 = require("./company/company.module");
const indicator_module_1 = require("./indicator/indicator.module");
const indicatorcompanydirection_module_1 = require("./indicatorcompanydirection/indicatorcompanydirection.module");
const planification_module_1 = require("./planification/planification.module");
const binnacle_module_1 = require("./binnacle/binnacle.module");
const reports_module_1 = require("./reports/reports.module");
const typeorm_2 = require("typeorm");
const create_superuser_seed_1 = require("./security/seeding/factories/create-superuser.seed");
let AppModule = class AppModule {
    constructor(connection) {
        this.connection = connection;
    }
    async configure(consumer) {
    }
    async onModuleInit() {
        await this.seedSuperuser();
    }
    async seedSuperuser() {
        const seeder = new create_superuser_seed_1.default();
        await seeder.run(undefined, this.connection);
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                ssl: process.env.STAGE === 'prod',
                extra: {
                    ssl: process.env.STAGE === 'prod'
                        ? { rejectUnauthorized: false }
                        : null,
                },
                type: 'postgres',
                host: process.env.DB_HOST,
                port: +process.env.DB_PORT,
                database: process.env.DB_NAME,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                autoLoadEntities: true,
                synchronize: true,
            }),
            security_module_1.SecurityModule,
            direction_module_1.DirectionModule,
            measurementunit_module_1.MeasurementunitModule,
            company_module_1.CompanyModule,
            indicator_module_1.IndicatorModule,
            indicatorcompanydirection_module_1.IndicatorcompanydirectionModule,
            planification_module_1.PlanificationModule,
            binnacle_module_1.BinnacleModule,
            reports_module_1.ReportsModule,
        ],
    }),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map