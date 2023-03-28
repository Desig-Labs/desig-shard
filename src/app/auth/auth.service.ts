import { Injectable, UnauthorizedException } from '@nestjs/common'

export type UserHeader = {
  userId: string
}

@Injectable()
export class AuthService {
  async verify(sig: string): Promise<UserHeader> {
    if (!sig) throw new UnauthorizedException()
    const ok = !!sig
    if (!ok) throw new UnauthorizedException()
    return { userId: sig }
  }
}
