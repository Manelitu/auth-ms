import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  configCors,
  configSwagger,
  configClassValidator,
  PrismaHelper,
} from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const db = app.get(PrismaHelper);
  await db.enableShutdownHooks(app);

  configCors(app);
  configClassValidator(app);
  configSwagger({
    app: app,
    config: {
      url: '/docs',
    },
  });

  await app.listen(3000);
}
bootstrap();
