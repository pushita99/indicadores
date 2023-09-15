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
exports.DirectionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const direction_entity_1 = require("./entities/direction.entity");
let DirectionService = class DirectionService {
    constructor(directionRepository) {
        this.directionRepository = directionRepository;
        this.logger = new common_1.Logger('Direction');
    }
    async create(createDirectionDto) {
        try {
            const direction = this.directionRepository.create(createDirectionDto);
            await this.directionRepository.save(direction);
            return direction;
        }
        catch (error) {
            this.handleDBExceptions(error);
        }
    }
    findAll() {
        return this.directionRepository.find({});
    }
    async findOne(id) {
        const direction = await this.directionRepository
            .findOne({ where: { id }, relations: { companies: true, indicators: true } });
        if (!direction)
            throw new common_1.NotFoundException('La direccion no fue encontrada');
        return direction;
    }
    async update(id, updateDirectionDto) {
        const direction = await this.directionRepository.preload(Object.assign({ id }, updateDirectionDto));
        if (!direction)
            throw new common_1.NotFoundException('Empresa no encontrada');
        try {
            await this.directionRepository.save(direction);
            return direction;
        }
        catch (error) {
            this.handleDBExceptions(error);
        }
    }
    async remove(id) {
        const direction = await this.findOne(id);
        await this.directionRepository.remove(direction);
    }
    handleDBExceptions(error) {
        if (error.code === '23505')
            throw new common_1.BadRequestException(error.detail);
        this.logger.error(error);
        throw new common_1.InternalServerErrorException('Error inesperado');
    }
};
DirectionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(direction_entity_1.Direction)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DirectionService);
exports.DirectionService = DirectionService;
//# sourceMappingURL=direction.service.js.map