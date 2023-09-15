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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const planification_entity_1 = require("./entities/planification.entity");
let PlanificationService = class PlanificationService {
    constructor(planificationRepository) {
        this.planificationRepository = planificationRepository;
        this.logger = new common_1.Logger('Planification');
    }
    async create(createPlanificationDto) {
        const { company, direction, indicator } = createPlanificationDto, data = __rest(createPlanificationDto, ["company", "direction", "indicator"]);
        try {
            const planification = this.planificationRepository.create(Object.assign(Object.assign({}, data), { indicator: { id: indicator }, company: { id: company }, direction: { id: direction } }));
            await this.planificationRepository.save(planification);
            return planification;
        }
        catch (error) {
            this.handleDBExceptions(error);
        }
    }
    findAll() {
        return this.planificationRepository.find({});
    }
    async findOne(id) {
        const planification = await this.planificationRepository.findOneBy({ id });
        if (!planification)
            throw new common_1.NotFoundException('La planificación no fue encontrada no fue encontrado');
        return planification;
    }
    update(id, updatePlanificationDto) {
        return `This action updates a #${id} planification`;
    }
    async remove(id) {
        const planification = await this.findOne(id);
        await this.planificationRepository.remove(planification);
    }
    handleDBExceptions(error) {
        if (error.code === '23505')
            throw new common_1.BadRequestException(error.detail);
        this.logger.error(error);
        throw new common_1.InternalServerErrorException('Error inesperado');
    }
};
PlanificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(planification_entity_1.Planification)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PlanificationService);
exports.PlanificationService = PlanificationService;
//# sourceMappingURL=planification.service.js.map