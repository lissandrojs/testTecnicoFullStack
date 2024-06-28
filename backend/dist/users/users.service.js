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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const mailer_1 = require("@nestjs-modules/mailer");
let UsersService = class UsersService {
    constructor(userRepository, mailService) {
        this.userRepository = userRepository;
        this.mailService = mailService;
    }
    async create(user) {
        user.password = await this.getHash(user.password);
        const result = await this.userRepository.save(this.userRepository.create(user));
        delete result.password;
        return result;
    }
    async update(id, user) {
        return await this.userRepository.update(id, { ...user });
    }
    async findByEmail(email) {
        return await this.userRepository.findOne({
            where: {
                email,
            },
        });
    }
    async findById(id) {
        return await this.userRepository.findBy({ id });
    }
    async getHash(password) {
        return await bcrypt.hash(password, 10);
    }
    async resetPassword(email) {
        const existEmail = await this.findByEmail(email);
        const token = new Date();
        if (!existEmail) {
            throw new common_1.UnauthorizedException();
        }
        const appUrl = `${process.env.BASE_URL}/insertNewPassword?email=${existEmail}?token=${token}`;
        await this.mailService.sendMail({
            to: existEmail.email,
            subject: 'Recuperar Senha',
            template: './recover-password',
            context: {
                name: existEmail.username,
                url: appUrl,
            },
        });
    }
    async remove(id) {
        return await this.userRepository.delete(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mailer_1.MailerService])
], UsersService);
//# sourceMappingURL=users.service.js.map