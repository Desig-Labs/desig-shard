import { DynamicModule, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { SignatureStrategy } from 'guards/sig.guard'
import { AuthService } from './auth.service'

@Module({
  imports: [PassportModule],
  providers: [AuthService, SignatureStrategy],
})
export class AuthModule {
  static forRoot({ isGlobal = false }: { isGlobal?: boolean }): DynamicModule {
    return {
      module: AuthModule,
      global: isGlobal,
    }
  }
}
