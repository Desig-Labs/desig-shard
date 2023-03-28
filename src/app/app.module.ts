import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import configuration from 'config/configuration'
import { ThrottlerConfigService } from './app.service'
import { HealthModule } from './health/health.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ThrottlerModule.forRootAsync({
      useClass: ThrottlerConfigService,
    }),
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
