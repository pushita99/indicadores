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
exports.IndicatorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const direction_entity_1 = require("../direction/entities/direction.entity");
const typeorm_2 = require("typeorm");
const indicator_entity_1 = require("./entities/indicator.entity");
let IndicatorService = class IndicatorService {
    constructor(indicatorRepository, directionRepository) {
        this.indicatorRepository = indicatorRepository;
        this.directionRepository = directionRepository;
        this.logger = new common_1.Logger('Indicator');
    }
    async create(createIndicatorDto) {
        const { measurementunit } = createIndicatorDto, data = __rest(createIndicatorDto, ["measurementunit"]);
        try {
            const indicator = this.indicatorRepository.create(Object.assign(Object.assign({}, data), { measurementunit: { id: measurementunit } }));
            await this.indicatorRepository.save(indicator);
            return indicator;
        }
        catch (error) {
            this.handleDBExceptions(error);
        }
    }
    async addDirectionToIndicator(id, directionId) {
        const indicator = await this.indicatorRepository.findOne({
            where: { id },
            relations: {
                directions: true,
            }
        });
        const direction = await this.directionRepository.findOneBy({ id: directionId });
        indicator.directions.push(direction);
        return this.indicatorRepository.save(indicator);
    }
    findAll() {
        return this.indicatorRepository.find({});
    }
    async findOne(id) {
        const indicator = await this.indicatorRepository.findOneBy({ id });
        if (!indicator)
            throw new common_1.NotFoundException('El tipo de indicador no fue encontrado');
        return indicator;
    }
    async findByDirection(direction) {
        const indicator = await this.indicatorRepository.find({
            relations: {
                directions: true,
            }
        });
        if (!indicator)
            throw new common_1.NotFoundException('El indicador no fue encontrado');
        return indicator.filter(c => {
            if (c.directions) {
                const directions = c.directions.map(d => d.id);
                return directions.includes(direction);
            }
            else {
                return false;
            }
        });
    }
    async update(id, updateIndicatorDto) {
        const { id: dtoId } = updateIndicatorDto, data = __rest(updateIndicatorDto, ["id"]);
        const indicator = await this.indicatorRepository.preload(Object.assign(Object.assign({}, updateIndicatorDto), { measurementunit: { id: updateIndicatorDto.measurementunit } }));
        if (!indicator)
            throw new common_1.NotFoundException('Empresa no encontrada');
        try {
            await this.indicatorRepository.save(indicator);
            return indicator;
        }
        catch (error) {
            this.handleDBExceptions(error);
        }
    }
    async remove(id) {
        const indicator = await this.findOne(id);
        await this.indicatorRepository.remove(indicator);
    }
    handleDBExceptions(error) {
        if (error.code === '23505')
            throw new common_1.BadRequestException(error.detail);
        this.logger.error(error);
        throw new common_1.InternalServerErrorException('Error inesperado');
    }
};
IndicatorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(indicator_entity_1.Indicator)),
    __param(1, (0, typeorm_1.InjectRepository)(direction_entity_1.Direction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], IndicatorService);
exports.IndicatorService = IndicatorService;
//# sourceMappingURL=indicator.service.js.map