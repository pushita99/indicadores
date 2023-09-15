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
exports.Measurementunit = void 0;
const indicator_entity_1 = require("../../indicator/entities/indicator.entity");
const typeorm_1 = require("typeorm");
let Measurementunit = class Measurementunit {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Measurementunit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { unique: true }),
    __metadata("design:type", String)
], Measurementunit.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => indicator_entity_1.Indicator, (indicator) => indicator.measurementunit),
    __metadata("design:type", indicator_entity_1.Indicator)
], Measurementunit.prototype, "indicators", void 0);
Measurementunit = __decorate([
    (0, typeorm_1.Entity)()
], Measurementunit);
exports.Measurementunit = Measurementunit;
//# sourceMappingURL=measurementunit.entity.js.map