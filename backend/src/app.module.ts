import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from './security/security.module';
import { DirectionModule } from './direction/direction.module';
import { MeasurementunitModule } from './measurementunit/measurementunit.module';
import { CompanyModule } from './company/company.module';
import { IndicatorModule } from './indicator/indicator.module';
import { IndicatorcompanydirectionModule } from './indicatorcompanydirection/indicatorcompanydirection.module';
import { PlanificationModule } from './planification/planification.module';
import { BinnacleModule } from './binnacle/binnacle.module';
import { ReportsModule } from './reports/reports.module';
import { Connection } from 'typeorm';
import CreateSuperuserSeed from './security/seeding/factories/create-superuser.seed';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod',
      extra: {
        ssl:process.env.STAGE === 'prod'
          ? {rejectUnauthorized: false}
          : null,
      },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,      
      database: process.env.DB_NAME,    
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    SecurityModule,
    DirectionModule,
    MeasurementunitModule,
    CompanyModule,
    IndicatorModule,
    IndicatorcompanydirectionModule,
    PlanificationModule,
    BinnacleModule,
    ReportsModule,

  ],

})
export class AppModule implements NestModule {
  constructor(private connection: Connection) {}

  async configure(consumer: MiddlewareConsumer) {
    // Configuración adicional de middleware, si es necesario
  }

  async onModuleInit() {
    await this.seedSuperuser();
  }

  async seedSuperuser() {
    const seeder = new CreateSuperuserSeed();
    await seeder.run(undefined, this.connection);
  }
}