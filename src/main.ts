import { VersioningType } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Constants } from "./utils/constants";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(Constants.API);
    app.enableVersioning({
        type: VersioningType.URI,
    });
    await app.listen(
        process.env.APP_PORT
    );
}

bootstrap();
