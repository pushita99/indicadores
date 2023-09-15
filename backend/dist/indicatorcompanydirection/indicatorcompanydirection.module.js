"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndicatorcompanydirectionModule = void 0;
const common_1 = require("@nestjs/common");
const indicatorcompanydirection_service_1 = require("./indicatorcompanydirection.service");
const indicatorcompanydirection_controller_1 = require("./indicatorcompanydirection.controller");
const typeorm_1 = require("@nestjs/typeorm");
const indicatorcompanydirection_entity_1 = require("./entities/indicatorcompanydirection.entity");
let IndicatorcompanydirectionModule = class IndicatorcompanydirectionModule {
};
IndicatorcompanydirectionModule = __decorate([
    (0, common_1.Module)({
        controllers: [indicatorcompanydirection_controller_1.IndicatorcompanydirectionController],
        providers: [indicatorcompanydirection_service_1.IndicatorcompanydirectionService],
        imports: [typeorm_1.TypeOrmModule.forFeature([indicatorcompanydirection_entity_1.Indicatorcompanydirection])]
    })
], IndicatorcompanydirectionModule);
exports.IndicatorcompanydirectionModule = IndicatorcompanydirectionModule;
//# sourceMappingURL=indicatorcompanydirection.module.js.map