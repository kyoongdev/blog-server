"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const prisma_service_1 = require("./database/prisma.service");
const express_session_1 = __importDefault(require("express-session"));
const kyoongdev_nestjs_1 = require("kyoongdev-nestjs");
const log_1 = require("./log");
const app_module_1 = require("./app.module");
(async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: log_1.winstonLogger,
    });
    app.enableCors({
        origin: ['http://localhost:3000', 'https://blog.kyoongdev.com/'],
        credentials: true,
    });
    app.use((0, cookie_parser_1.default)());
    const prismaService = app.get(prisma_service_1.PrismaService);
    await prismaService.enableShutdownHooks(app);
    const configService = app.get(config_1.ConfigService);
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Kyoongdev Village API')
        .setDescription('Kyoongdev Village - 블로그 전용 api 입니다.')
        .setVersion('0.1')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
    }, 'access-token')
        .build();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.use(kyoongdev_nestjs_1.PaginationMiddleware);
    app.use((0, express_session_1.default)({
        secret: configService.get('SESSION_SECRET'),
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60,
        },
    }));
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    await app.listen(8000, () => {
        console.info('🔹Server is running on port 8000🔹!!');
    });
})();
//# sourceMappingURL=main.js.map