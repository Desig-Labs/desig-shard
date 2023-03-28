import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  ThrottlerModuleOptions,
  ThrottlerOptionsFactory,
} from '@nestjs/throttler'

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService
  public createThrottlerOptions(): ThrottlerModuleOptions {
    return {
      ttl: this.config.get('throttler.ttl', { infer: true }),
      limit: this.config.get('throttler.limit', { infer: true }),
    }
  }
}
