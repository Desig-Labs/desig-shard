import { DynamicModule, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthStrategy } from 'guards/auth.guard'
import { AuthService } from './auth.service'

@Module({
  imports: [PassportModule],
  providers: [AuthService, AuthStrategy],
})
export class AuthModule {
  static forRoot({ isGlobal = false }: { isGlobal?: boolean }): DynamicModule {
    return {
      module: AuthModule,
      global: isGlobal,
    }
  }
}
