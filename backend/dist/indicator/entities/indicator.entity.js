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
exports.Indicator = void 0;
const direction_entity_1 = require("../../direction/entities/direction.entity");
const indicatorcompanydirection_entity_1 = require("../../indicatorcompanydirection/entities/indicatorcompanydirection.entity");
const measurementunit_entity_1 = require("../../measurementunit/entities/measurementunit.entity");
const planification_entity_1 = require("../../planification/entities/planification.entity");
const typeorm_1 = require("typeorm");
let Indicator = class Indicator {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Indicator.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text', {
        unique: true,
    }),
    __metadata("design:type", String)
], Indicator.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Indicator.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => measurementunit_entity_1.Measurementunit, (measurementunit) => measurementunit.indicators, { nullable: false,
        onDelete: 'CASCADE', }),
    __metadata("design:type", measurementunit_entity_1.Measurementunit)
], Indicator.prototype, "measurementunit", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => direction_entity_1.Direction, (direction) => direction.indicators),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Indicator.prototype, "directions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => indicatorcompanydirection_entity_1.Indicatorcompanydirection, (indicatorcompanydirection) => indicatorcompanydirection.indicator),
    __metadata("design:type", indicatorcompanydirection_entity_1.Indicatorcompanydirection)
], Indicator.prototype, "indicatorcompanydirections", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => planification_entity_1.Planification, (planification) => planification.indicator),
    __metadata("design:type", planification_entity_1.Planification)
], Indicator.prototype, "planifications", void 0);
Indicator = __decorate([
    (0, typeorm_1.Entity)()
], Indicator);
exports.Indicator = Indicator;
//# sourceMappingURL=indicator.entity.js.map