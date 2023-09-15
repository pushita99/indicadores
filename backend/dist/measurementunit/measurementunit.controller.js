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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasurementunitController = void 0;
const common_1 = require("@nestjs/common");
const measurementunit_service_1 = require("./measurementunit.service");
const create_measurementunit_dto_1 = require("./dto/create-measurementunit.dto");
const update_measurementunit_dto_1 = require("./dto/update-measurementunit.dto");
let MeasurementunitController = class MeasurementunitController {
    constructor(measurementunitService) {
        this.measurementunitService = measurementunitService;
    }
    create(createMeasurementunitDto) {
        return this.measurementunitService.create(createMeasurementunitDto);
    }
    findAll() {
        return this.measurementunitService.findAll();
    }
    findOne(id) {
        return this.measurementunitService.findOne(+id);
    }
    update(id, updateMeasurementunitDto) {
        return this.measurementunitService.update(+id, updateMeasurementunitDto);
    }
    remove(id) {
        return this.measurementunitService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_measurementunit_dto_1.CreateMeasurementunitDto]),
    __metadata("design:returntype", void 0)
], MeasurementunitController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MeasurementunitController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MeasurementunitController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_measurementunit_dto_1.UpdateMeasurementunitDto]),
    __metadata("design:returntype", void 0)
], MeasurementunitController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MeasurementunitController.prototype, "remove", null);
MeasurementunitController = __decorate([
    (0, common_1.Controller)('measurementunit'),
    __metadata("design:paramtypes", [measurementunit_service_1.MeasurementunitService])
], MeasurementunitController);
exports.MeasurementunitController = MeasurementunitController;
//# sourceMappingURL=measurementunit.controller.js.map