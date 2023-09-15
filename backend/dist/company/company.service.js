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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const direction_entity_1 = require("../direction/entities/direction.entity");
const typeorm_2 = require("typeorm");
const company_entity_1 = require("./entities/company.entity");
let CompanyService = class CompanyService {
    constructor(companyRepository, directionRepository) {
        this.companyRepository = companyRepository;
        this.directionRepository = directionRepository;
        this.logger = new common_1.Logger('Company');
    }
    async create(createCompanyDto) {
        try {
            const company = this.companyRepository.create(createCompanyDto);
            await this.companyRepository.save(company);
            return company;
        }
        catch (error) {
            this.handleDBExceptions(error);
        }
    }
    async addDirectionToCompany(id, directionId) {
        const company = await this.companyRepository.findOne({
            where: { id },
            relations: {
                directions: true,
            }
        });
        const direction = await this.directionRepository.findOneBy({ id: directionId });
        company.directions.push(direction);
        return this.companyRepository.save(company);
    }
    findAll() {
        return this.companyRepository.find({});
    }
    async findOne(id) {
        const company = await this.companyRepository.findOneBy({ id });
        if (!company)
            throw new common_1.NotFoundException('La empresa no fue encontrada');
        return company;
    }
    async findByDirection(direction) {
        const company = await this.companyRepository.find({
            relations: {
                directions: true,
            }
        });
        if (!company)
            throw new common_1.NotFoundException('La empresa no fue encontrada');
        return company.filter(c => {
            if (c.directions) {
                const directions = c.directions.map(d => d.id);
                return directions.includes(direction);
            }
            else {
                return false;
            }
        });
    }
    async update(id, updateCompanyDto) {
        const company = await this.companyRepository.preload(Object.assign({ id: id }, updateCompanyDto));
        if (!company)
            throw new common_1.NotFoundException('Empresa no encontrada');
        try {
            await this.companyRepository.save(company);
            return company;
        }
        catch (error) {
            this.handleDBExceptions(error);
        }
    }
    async remove(id) {
        const company = await this.findOne(id);
        await this.companyRepository.remove(company);
    }
    handleDBExceptions(error) {
        if (error.code === '23505')
            throw new common_1.BadRequestException(error.detail);
        this.logger.error(error);
        throw new common_1.InternalServerErrorException('Error inesperado');
    }
};
CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __param(1, (0, typeorm_1.InjectRepository)(direction_entity_1.Direction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CompanyService);
exports.CompanyService = CompanyService;
//# sourceMappingURL=company.service.js.map