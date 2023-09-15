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
exports.IndicatorController = void 0;
const common_1 = require("@nestjs/common");
const indicator_service_1 = require("./indicator.service");
const create_indicator_dto_1 = require("./dto/create-indicator.dto");
const update_indicator_dto_1 = require("./dto/update-indicator.dto");
let IndicatorController = class IndicatorController {
    constructor(indicatorService) {
        this.indicatorService = indicatorService;
    }
    create(createIndicatorDto) {
        return this.indicatorService.create(createIndicatorDto);
    }
    addDirectionToIndicator(id, directionId) {
        return this.indicatorService.addDirectionToIndicator(id, directionId);
    }
    findAll() {
        return this.indicatorService.findAll();
    }
    findOne(id) {
        return this.indicatorService.findOne(+id);
    }
    findByDirection(direction) {
        return this.indicatorService.findByDirection(+direction);
    }
    update(id, updateIndicatorDto) {
        return this.indicatorService.update(+id, updateIndicatorDto);
    }
    remove(id) {
        return this.indicatorService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_indicator_dto_1.CreateIndicatorDto]),
    __metadata("design:returntype", void 0)
], IndicatorController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id/direction/:directionId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('directionId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], IndicatorController.prototype, "addDirectionToIndicator", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IndicatorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IndicatorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/direction/:direction'),
    __param(0, (0, common_1.Param)('direction')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], IndicatorController.prototype, "findByDirection", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_indicator_dto_1.UpdateIndicatorDto]),
    __metadata("design:returntype", void 0)
], IndicatorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IndicatorController.prototype, "remove", null);
IndicatorController = __decorate([
    (0, common_1.Controller)('indicator'),
    __metadata("design:paramtypes", [indicator_service_1.IndicatorService])
], IndicatorController);
exports.IndicatorController = IndicatorController;
//# sourceMappingURL=indicator.controller.js.map