import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import configuration from 'config/configuration'
import { ThrottlerConfigService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { HealthModule } from './health/health.module'
import { StorageModule } from './storage/storage.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ThrottlerModule.forRootAsync({
      useClass: ThrottlerConfigService,
    }),
    AuthModule.forRoot({
      isGlobal: true,
    }),
    HealthModule,
    StorageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
