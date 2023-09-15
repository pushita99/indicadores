"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinnacleModule = void 0;
const common_1 = require("@nestjs/common");
const binnacle_service_1 = require("./binnacle.service");
const binnacle_controller_1 = require("./binnacle.controller");
const binnacle_entity_1 = require("./entities/binnacle.entity");
const typeorm_1 = require("@nestjs/typeorm");
let BinnacleModule = class BinnacleModule {
};
BinnacleModule = __decorate([
    (0, common_1.Module)({
        controllers: [binnacle_controller_1.BinnacleController],
        providers: [binnacle_service_1.BinnacleService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([binnacle_entity_1.Binnacle])
        ]
    })
], BinnacleModule);
exports.BinnacleModule = BinnacleModule;
//# sourceMappingURL=binnacle.module.js.map