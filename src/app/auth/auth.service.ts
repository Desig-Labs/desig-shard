import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { verify } from '@noble/ed25519'
import { decode } from 'bs58'

export type UserHeader = { signerId: string }

@Injectable()
export class AuthService {
  private myid = this.config.get('myid', { infer: true })

  constructor(private readonly config: ConfigService) {
    if (!this.myid) throw new Error('Invalid MY_ID env variable')
  }

  async verify(message: string, signature: string): Promise<UserHeader> {
    if (!message || !signature) throw new UnauthorizedException()
    const { from, to, expiredAt } = JSON.parse(
      new TextDecoder().decode(decode(message)),
    )
    if (to !== this.myid) throw new UnauthorizedException()
    if (expiredAt < Date.now()) throw new UnauthorizedException()
    const ok = await verify(decode(signature), decode(message), decode(from))
    if (!ok) throw new UnauthorizedException()
    return { signerId: from }
  }
}
