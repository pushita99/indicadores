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
exports.Company = void 0;
const direction_entity_1 = require("../../direction/entities/direction.entity");
const indicatorcompanydirection_entity_1 = require("../../indicatorcompanydirection/entities/indicatorcompanydirection.entity");
const planification_entity_1 = require("../../planification/entities/planification.entity");
const typeorm_1 = require("typeorm");
let Company = class Company {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Company.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { unique: true }),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => direction_entity_1.Direction, (directions) => directions.companies),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Company.prototype, "directions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => indicatorcompanydirection_entity_1.Indicatorcompanydirection, (indicatorcompanydirection) => indicatorcompanydirection.company),
    __metadata("design:type", indicatorcompanydirection_entity_1.Indicatorcompanydirection)
], Company.prototype, "indicatorcompanydirections", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => planification_entity_1.Planification, (planification) => planification.company),
    __metadata("design:type", planification_entity_1.Planification)
], Company.prototype, "planifications", void 0);
Company = __decorate([
    (0, typeorm_1.Entity)()
], Company);
exports.Company = Company;
//# sourceMappingURL=company.entity.js.map