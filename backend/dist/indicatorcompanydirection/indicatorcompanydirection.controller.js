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
exports.IndicatorcompanydirectionController = void 0;
const common_1 = require("@nestjs/common");
const indicatorcompanydirection_service_1 = require("./indicatorcompanydirection.service");
const create_indicatorcompanydirection_dto_1 = require("./dto/create-indicatorcompanydirection.dto");
const update_indicatorcompanydirection_dto_1 = require("./dto/update-indicatorcompanydirection.dto");
let IndicatorcompanydirectionController = class IndicatorcompanydirectionController {
    constructor(indicatorcompanydirectionService) {
        this.indicatorcompanydirectionService = indicatorcompanydirectionService;
    }
    create(createIndicatorcompanydirectionDto) {
        return this.indicatorcompanydirectionService.create(createIndicatorcompanydirectionDto);
    }
    findAll() {
        return this.indicatorcompanydirectionService.findAll();
    }
    findOne(id) {
        return this.indicatorcompanydirectionService.findOne(+id);
    }
    update(id, updateIndicatorcompanydirectionDto) {
        return this.indicatorcompanydirectionService.update(+id, updateIndicatorcompanydirectionDto);
    }
    remove(id) {
        return this.indicatorcompanydirectionService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_indicatorcompanydirection_dto_1.CreateIndicatorcompanydirectionDto]),
    __metadata("design:returntype", void 0)
], IndicatorcompanydirectionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IndicatorcompanydirectionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IndicatorcompanydirectionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_indicatorcompanydirection_dto_1.UpdateIndicatorcompanydirectionDto]),
    __metadata("design:returntype", void 0)
], IndicatorcompanydirectionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IndicatorcompanydirectionController.prototype, "remove", null);
IndicatorcompanydirectionController = __decorate([
    (0, common_1.Controller)('indicatorcompanydirection'),
    __metadata("design:paramtypes", [indicatorcompanydirection_service_1.IndicatorcompanydirectionService])
], IndicatorcompanydirectionController);
exports.IndicatorcompanydirectionController = IndicatorcompanydirectionController;
//# sourceMappingURL=indicatorcompanydirection.controller.js.map