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
exports.BinnacleController = void 0;
const common_1 = require("@nestjs/common");
const binnacle_service_1 = require("./binnacle.service");
const create_binnacle_dto_1 = require("./dto/create-binnacle.dto");
const update_binnacle_dto_1 = require("./dto/update-binnacle.dto");
let BinnacleController = class BinnacleController {
    constructor(binnacleService) {
        this.binnacleService = binnacleService;
    }
    create(createBinnacleDto) {
        return this.binnacleService.create(createBinnacleDto);
    }
    findAll() {
        return this.binnacleService.findAll();
    }
    findOne(id) {
        return this.binnacleService.findOne(+id);
    }
    update(id, updateBinnacleDto) {
        return this.binnacleService.update(+id, updateBinnacleDto);
    }
    remove(id) {
        return this.binnacleService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_binnacle_dto_1.CreateBinnacleDto]),
    __metadata("design:returntype", void 0)
], BinnacleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BinnacleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BinnacleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_binnacle_dto_1.UpdateBinnacleDto]),
    __metadata("design:returntype", void 0)
], BinnacleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BinnacleController.prototype, "remove", null);
BinnacleController = __decorate([
    (0, common_1.Controller)('binnacle'),
    __metadata("design:paramtypes", [binnacle_service_1.BinnacleService])
], BinnacleController);
exports.BinnacleController = BinnacleController;
//# sourceMappingURL=binnacle.controller.js.map