import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { configDotenv } from 'dotenv';

async function bootstrap() {
    configDotenv();
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap().then(_ => console.log(`Server started and listen in ${process.env.PORT ?? 3000}`));