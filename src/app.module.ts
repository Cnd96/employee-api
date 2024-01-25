import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './_shared/http-error-filter';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'postgres',
        host: process.env.DB_HOST ,
        port: 5432,
        username: process.env.DB_USER ,
        password: process.env.DB_PASSWORD ,
        database: process.env.DB_NAME ,
        logging: false,
        synchronize: false,
      }),
    }),
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
