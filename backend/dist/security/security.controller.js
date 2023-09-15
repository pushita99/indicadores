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
exports.SecurityController = void 0;
const common_1 = require("@nestjs/common");
const security_service_1 = require("./security.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const login_user_dto_1 = require("./dto/login-user.dto");
const passport_1 = require("@nestjs/passport");
const valid_roles_1 = require("./interfaces/valid-roles");
const auth_decorator_1 = require("./decorators/auth.decorator");
const get_user_decorator_1 = require("./decorators/get-user.decorator");
const user_entity_1 = require("./entities/user.entity");
let SecurityController = class SecurityController {
    constructor(securityService) {
        this.securityService = securityService;
    }
    create(createSecurityDto) {
        return this.securityService.create(createSecurityDto);
    }
    login(loginUserDto) {
        return this.securityService.login(loginUserDto);
    }
    checkAuthStatus(user) {
        return this.securityService.checkAuthStatus(user);
    }
    findAll() {
        return this.securityService.findAll();
    }
    findOne(id) {
        return this.securityService.findOne(+id);
    }
    test() {
        return { ok: 'test' };
    }
    update(id, updateSecurityDto) {
        return this.securityService.update(+id, updateSecurityDto);
    }
    remove(id) {
        return this.securityService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(('register')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], SecurityController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(('login')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", void 0)
], SecurityController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('renew'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], SecurityController.prototype, "checkAuthStatus", null);
__decorate([
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SecurityController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SecurityController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('private'),
    (0, auth_decorator_1.Auth)(valid_roles_1.ValidRoles.user),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SecurityController.prototype, "test", null);
__decorate([
    (0, common_1.Patch)('users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], SecurityController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SecurityController.prototype, "remove", null);
SecurityController = __decorate([
    (0, common_1.Controller)('security'),
    __metadata("design:paramtypes", [security_service_1.SecurityService])
], SecurityController);
exports.SecurityController = SecurityController;
//# sourceMappingURL=security.controller.js.map