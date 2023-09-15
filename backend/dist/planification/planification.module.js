"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanificationModule = void 0;
const common_1 = require("@nestjs/common");
const planification_service_1 = require("./planification.service");
const planification_controller_1 = require("./planification.controller");
const typeorm_1 = require("@nestjs/typeorm");
const planification_entity_1 = require("./entities/planification.entity");
let PlanificationModule = class PlanificationModule {
};
PlanificationModule = __decorate([
    (0, common_1.Module)({
        controllers: [planification_controller_1.PlanificationController],
        providers: [planification_service_1.PlanificationService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([planification_entity_1.Planification])
        ]
    })
], PlanificationModule);
exports.PlanificationModule = PlanificationModule;
//# sourceMappingURL=planification.module.js.map