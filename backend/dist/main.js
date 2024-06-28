"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API de Cadastro de usuarios')
        .setDescription('Api de cadastros de usuários com autenticação, login e acesso as informações breve do cliente.')
        .setVersion('1.0')
        .addTag('Usuarios')
        .build();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    app.useGlobalPipes(new common_1.ValidationPipe());
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map