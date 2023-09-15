"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndicatorModule = void 0;
const common_1 = require("@nestjs/common");
const indicator_service_1 = require("./indicator.service");
const indicator_controller_1 = require("./indicator.controller");
const typeorm_1 = require("@nestjs/typeorm");
const indicator_entity_1 = require("./entities/indicator.entity");
const direction_entity_1 = require("../direction/entities/direction.entity");
let IndicatorModule = class IndicatorModule {
};
IndicatorModule = __decorate([
    (0, common_1.Module)({
        controllers: [indicator_controller_1.IndicatorController],
        providers: [indicator_service_1.IndicatorService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([indicator_entity_1.Indicator, direction_entity_1.Direction])
        ]
    })
], IndicatorModule);
exports.IndicatorModule = IndicatorModule;
//# sourceMappingURL=indicator.module.js.map