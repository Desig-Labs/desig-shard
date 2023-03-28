import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Level } from 'level'

@Injectable()
export class LevelService {
  private readonly root = this.config.get('level.root', { infer: true })
  private readonly connection = new Level(this.root, { valueEncoding: 'json' })

  constructor(private readonly config: ConfigService) {}

  private async engine(userId: string) {
    const db = this.connection.sublevel(userId)
    if (!db.supports.permanence)
      throw new Error('Persistent storage is required')
    await db.open({ passive: true })
    return db
  }

  /**
   * Get value of key by user id
   * @param userId User id (base58-encoded pubkey)
   * @param key Key
   * @returns Value
   */
  async get(userId: string, key: string) {
    const db = await this.engine(userId)
    return await db.get(key)
  }

  /**
   * Get all values by user id
   * @param userId User id (base58-encoded pubkey)
   * @param key Key
   * @returns Value
   */
  async all(userId: string) {
    const db = await this.engine(userId)
    const data = {}
    for await (const [key, value] of db.iterator()) data[key] = value
    return data
  }

  /**
   * Set values of keys by user id
   * @param userId User id (base58-encoded pubkey)
   * @param data { key: value }
   * @returns True
   */
  async set(userId: string, data: Record<string, any>) {
    const db = await this.engine(userId)
    const keys = Object.keys(data)
    await db.batch(keys.map((key) => ({ type: 'put', key, value: data[key] })))
    return true
  }

  /**
   * Delete values of keys by user id
   * @param userId User id (base58-encoded pubkey)
   * @param key Key
   * @returns Trues
   */
  async delete(userId: string, key: string) {
    const db = await this.engine(userId)
    await db.del(key)
    return true
  }
}
