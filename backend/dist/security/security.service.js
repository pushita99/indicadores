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
exports.SecurityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let SecurityService = class SecurityService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger('User');
    }
    async create(createUserDto) {
        const { password, direction } = createUserDto, userData = __rest(createUserDto, ["password", "direction"]);
        try {
            const user = this.userRepository.create(Object.assign(Object.assign({ password: bcrypt.hashSync(password, 10) }, userData), { direction: { id: direction } }));
            console.log(user);
            await this.userRepository.save(user);
            return Object.assign(Object.assign({}, user), { token: this.getJwtToken({ id: user.id }) });
        }
        catch (error) {
            this.handleDBExceptions(error);
        }
    }
    async login(loginUserDto) {
        const { password, email } = loginUserDto;
        const user = await this.userRepository.findOne({
            where: { email },
            relations: {
                direction: true,
            }
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Las credenciales son incorrectas (c)');
        }
        if (!bcrypt.compareSync(password, user.password)) {
            throw new common_1.UnauthorizedException('Las credenciales son incorrectas (p)');
        }
        return {
            name: user.name,
            direction: user.direction,
            role: user.role,
            token: this.getJwtToken({ id: user.id })
        };
    }
    async checkAuthStatus(user) {
        return {
            user: user.name,
            direction: user.direction,
            role: user.role,
            token: this.getJwtToken({ id: user.id }),
        };
    }
    findAll() {
        return this.userRepository.find({});
    }
    async findOne(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            throw new common_1.NotFoundException('El usuario no fue encontrado');
        return user;
    }
    update(id, updateSecurityDto) {
        return `This action updates a #${id} security`;
    }
    async remove(id) {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
    }
    handleDBExceptions(error) {
        if (error.code === '23505')
            throw new common_1.BadRequestException(error.detail);
        this.logger.error(error);
        throw new common_1.InternalServerErrorException('Error inesperado');
    }
    getJwtToken(payload) {
        const token = this.jwtService.sign(payload);
        return token;
    }
};
SecurityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], SecurityService);
exports.SecurityService = SecurityService;
//# sourceMappingURL=security.service.js.map