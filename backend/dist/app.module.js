"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const service_module_1 = require("./service/service.module");
const mailer_1 = require("@nestjs-modules/mailer");
const cache_module_1 = require("./cache/cache.module");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("./auth/auth.guard");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: process.env.DB_DRIVE,
                host: process.env.DB_URL,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [__dirname + '/**/*.entity{.js,.ts}'],
                synchronize: process.env.DEVELOPMENT_ENVIRONMENT === 'true',
            }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.SMTP_HOST,
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASSWORD,
                    },
                },
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            service_module_1.ServiceModule,
            cache_module_1.AppCacheModule,
        ],
        controllers: [],
        providers: [{ provide: core_1.APP_GUARD, useClass: auth_guard_1.AuthGuard }],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map