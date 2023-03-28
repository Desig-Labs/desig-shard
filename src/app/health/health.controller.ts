import { Controller, All } from '@nestjs/common'
import { HealthService } from './health.service'

@Controller('/health')
export class HealthController {
  constructor(private readonly service: HealthService) {}

  @All()
  check(): string {
    return this.service.check()
  }
}
