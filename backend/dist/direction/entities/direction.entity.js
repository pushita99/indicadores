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
exports.Direction = void 0;
const company_entity_1 = require("../../company/entities/company.entity");
const indicator_entity_1 = require("../../indicator/entities/indicator.entity");
const indicatorcompanydirection_entity_1 = require("../../indicatorcompanydirection/entities/indicatorcompanydirection.entity");
const planification_entity_1 = require("../../planification/entities/planification.entity");
const user_entity_1 = require("../../security/entities/user.entity");
const typeorm_1 = require("typeorm");
let Direction = class Direction {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Direction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { unique: true }),
    __metadata("design:type", String)
], Direction.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.direction),
    __metadata("design:type", user_entity_1.User)
], Direction.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => company_entity_1.Company, (companies) => companies.directions),
    __metadata("design:type", Array)
], Direction.prototype, "companies", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => indicatorcompanydirection_entity_1.Indicatorcompanydirection, (indicatorcompanydirection) => indicatorcompanydirection.direction),
    __metadata("design:type", Array)
], Direction.prototype, "indicatorcompanydirections", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => planification_entity_1.Planification, (planification) => planification.direction),
    __metadata("design:type", Array)
], Direction.prototype, "planifications", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => indicator_entity_1.Indicator, (indicator) => indicator.directions),
    __metadata("design:type", Array)
], Direction.prototype, "indicators", void 0);
Direction = __decorate([
    (0, typeorm_1.Entity)()
], Direction);
exports.Direction = Direction;
//# sourceMappingURL=direction.entity.js.map