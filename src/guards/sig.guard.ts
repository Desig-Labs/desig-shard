import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard, PassportStrategy } from '@nestjs/passport'
import { AuthService, UserHeader } from 'app/auth/auth.service'
import { Request } from 'express'
import { Strategy } from 'passport-http-bearer'

@Injectable()
export class SignatureStrategy extends PassportStrategy(Strategy, 'signature') {
  constructor(private authSerive: AuthService) {
    super()
  }

  async validate(token: string): Promise<UserHeader> {
    const [message, signature] = token.split('/')
    return this.authSerive.verify(message, signature)
  }
}

@Injectable()
export class SignatureGuard extends AuthGuard('signature') {
  getRequest(context: ExecutionContext) {
    const http = context.switchToHttp()
    const request = http.getRequest<Request>()
    return request
  }
}
