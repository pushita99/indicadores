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
exports.Planification = void 0;
const company_entity_1 = require("../../company/entities/company.entity");
const direction_entity_1 = require("../../direction/entities/direction.entity");
const indicator_entity_1 = require("../../indicator/entities/indicator.entity");
const typeorm_1 = require("typeorm");
let Planification = class Planification {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Planification.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], Planification.prototype, "january", void 0);
__decorate([
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], Planification.prototype, "february", void 0);
__decorate([
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], Planification.prototype, "march", void 0);
__decorate([
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], Planification.prototype, "april", void 0);
__decorate([
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], Planification.prototype, "may", void 0);
__decorate([
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], Planification.prototype, "june", void 0);
__decorate([
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], Planification.prototype, "july", void 0);
__decorate([
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], Planification.prototype, "august", void 0);
__decorate([
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], Planification.prototype, "september", void 0);
__decorate([
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], Planification.prototype, "october", void 0);
__decorate([
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], Planification.prototype, "november", void 0);
__decorate([
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], Planification.prototype, "december", void 0);
__decorate([
    (0, typeorm_1.Column)('date'),
    __metadata("design:type", Date)
], Planification.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => indicator_entity_1.Indicator, (indicator) => indicator.planifications, { eager: true, }),
    __metadata("design:type", indicator_entity_1.Indicator)
], Planification.prototype, "indicator", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.planifications, { eager: true, }),
    __metadata("design:type", company_entity_1.Company)
], Planification.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => direction_entity_1.Direction, (direction) => direction.planifications, { eager: true, }),
    __metadata("design:type", direction_entity_1.Direction)
], Planification.prototype, "direction", void 0);
Planification = __decorate([
    (0, typeorm_1.Entity)()
], Planification);
exports.Planification = Planification;
//# sourceMappingURL=planification.entity.js.map