import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cluster = require('cluster');
import * as os from 'os';

async function bootstrap() {
  const clusterAny: any = cluster; // Type assertion
  const isMaster = clusterAny.isMaster;
  const numCPUs = os.cpus().length;
  if (isMaster) {
    console.log(`Master ${process.pid} is running ${numCPUs}`);

    // Fork workers
    for (let i = 0; i < 2; i++) {
      clusterAny.fork();
    }

    clusterAny.on('exit', (worker, code, signal) => {
      console.log(`Worker  ${worker.process.pid} died`);
    });
  } else {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api/v1');
    if (process.env.APP_ENV === 'dev') {
      app.enableCors();
    } else if (process.env.APP_ENV === 'prod') {
      // Enable limited CORS in production for security
      app.enableCors({
        origin: [],
      });
    }
    app.useGlobalPipes(new ValidationPipe());
    const config = new DocumentBuilder()
      .setTitle('Employee Manager')
      .setDescription('Employee Manager API description')
      .setVersion('1.0')
      .addTag('employee')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(3001);
    console.log(`Worker ${process.pid} started`);
  }
}

bootstrap();
