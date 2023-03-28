import { Injectable, UnauthorizedException } from '@nestjs/common'
import { verify } from '@noble/ed25519'
import { decode } from 'bs58'

export type UserHeader = {
  userId: string
}

@Injectable()
export class AuthService {
  async verify(message: string, signature: string): Promise<UserHeader> {
    if (!message || !signature) throw new UnauthorizedException()
    const { from, to, createdAt, ttl } = JSON.parse(
      new TextDecoder().decode(decode(message)),
    )
    if (from !== to) throw new UnauthorizedException()
    if (createdAt + ttl < Date.now()) throw new UnauthorizedException()
    const ok = await verify(decode(signature), decode(message), decode(from))
    if (!ok) throw new UnauthorizedException()
    return { userId: from }
  }
}
