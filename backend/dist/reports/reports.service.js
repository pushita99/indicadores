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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const direction_entity_1 = require("../direction/entities/direction.entity");
const indicator_entity_1 = require("../indicator/entities/indicator.entity");
const typeorm_2 = require("typeorm");
let ReportsService = class ReportsService {
    constructor(directionRepository, indicatorRepository) {
        this.directionRepository = directionRepository;
        this.indicatorRepository = indicatorRepository;
    }
    create(createReportDto) {
        return 'This action adds a new report';
    }
    async generalReport(id, date) {
        try {
            const direction = await this.directionRepository.findOne({
                where: { id },
                relations: {
                    planifications: true,
                    indicatorcompanydirections: true,
                    companies: true,
                    indicators: true,
                }
            });
            const { companies, planifications, indicatorcompanydirections, indicators } = direction;
            const indicadores = [];
            indicators.forEach(element => {
                var _a;
                indicadores.push({
                    name: (element === null || element === void 0 ? void 0 : element.name) || '',
                    measurementunit: ((_a = element.measurementunit) === null || _a === void 0 ? void 0 : _a.name) || '',
                    companies: companies.map(company => {
                        const value = this.getIndicator(indicatorcompanydirections, date, element, company);
                        ;
                        const planification = this.getPlanifications(planifications, date, element, company);
                        return {
                            name: company.name,
                            planification: planification || '',
                            value: value || '',
                        };
                    })
                });
            });
            return indicadores;
        }
        catch (e) {
            console.log(e);
        }
    }
    getPlanifications(planifications, date, indicator, company) {
        const dateT = new Date();
        const plan = planifications.filter((p) => {
            return p.indicator.id === indicator.id && p.company.id === company.id && p.date.toString().substring(0, 7) === date.substring(0, 7);
        });
        return plan[0] && plan[0][this.getMonthName(date)];
    }
    getIndicator(indicadors, date, indicator, company) {
        var _a;
        const ind = indicadors.filter((i) => {
            return i.indicator.id === indicator.id && i.company.id === company.id && i.date.toString().substring(0, 7) === date.substring(0, 7);
        });
        return (_a = ind[0]) === null || _a === void 0 ? void 0 : _a.value;
    }
    findOne(id) {
        return `This action returns a #${id} report`;
    }
    update(id, updateReportDto) {
        return `This action updates a #${id} report`;
    }
    remove(id) {
        return `This action removes a #${id} report`;
    }
    getMonthName(date) {
        let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        console.log('getMonthName: ', months[+date.substring(5, 7)]);
        return months[+date.substring(5, 7)];
    }
};
ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(direction_entity_1.Direction)),
    __param(1, (0, typeorm_1.InjectRepository)(indicator_entity_1.Indicator)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ReportsService);
exports.ReportsService = ReportsService;
//# sourceMappingURL=reports.service.js.map