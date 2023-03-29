import { Injectable } from '@nestjs/common'
import { LevelService } from 'app/level/level.service'

@Injectable()
export class StorageService {
  constructor(private readonly level: LevelService) {}

  /**
   * Read multisid data of a user
   * @param userId User id
   * @param multisigId (Optional) Mutisig id
   * @returns
   */
  async readStorage(userId: string, multisigId?: string) {
    if (!multisigId) return this.level.all(userId)
    return this.level.get(userId, multisigId)
  }

  /**
   * Either insert or update users to a new multisig
   * @param multisigId Multisig id
   * @param users List of multisig members
   * @returns True
   */
  async upsertStorage(multisigId: string, users: Record<string, string>) {
    if (!users) throw new Error('Invalid users data')
    const conn = this.level.connection()
    await conn.batch(
      Object.keys(users).map((userId) => ({
        type: 'put',
        sublevel: this.level.db(userId),
        key: multisigId,
        value: users[userId],
      })),
    )
    return true
  }

  /**
   * Delete a user
   * @param userId User id
   * @param multisigId Mutisig id
   * @returns
   */
  async deleteStorage(userId: string, multisigId: string) {
    return this.level.delete(userId, multisigId)
  }
}
