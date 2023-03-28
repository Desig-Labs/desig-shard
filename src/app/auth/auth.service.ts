import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { getPublicKey, verify } from '@noble/ed25519'
import { decode, encode } from 'bs58'

export type UserHeader = {
  userId: string
}

@Injectable()
export class AuthService {
  private master = this.config.get('keypair.pubkey', { infer: true })

  constructor(private readonly config: ConfigService) {
    this.validate()
  }

  private async validate() {
    const privkey = this.config.get('keypair.privkey', { infer: true })
    if (!this.master || !privkey)
      throw new Error('The server need to have a keypair for identity')
    const pubkey = encode(await getPublicKey(decode(privkey)))
    if (this.master !== pubkey) throw new Error('Unmatched keypair')
  }

  async verify(message: string, signature: string): Promise<UserHeader> {
    if (!message || !signature) throw new UnauthorizedException()
    const { from, to, expiredAt } = JSON.parse(
      new TextDecoder().decode(decode(message)),
    )
    if (to !== this.master) throw new UnauthorizedException()
    if (expiredAt < Date.now()) throw new UnauthorizedException()
    const ok = await verify(decode(signature), decode(message), decode(from))
    if (!ok) throw new UnauthorizedException()
    return { userId: from }
  }
}
