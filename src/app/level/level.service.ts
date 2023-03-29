import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Level } from 'level'

@Injectable()
export class LevelService {
  public readonly _root = this.config.get('level.root', { infer: true })
  public readonly _connection = new Level(this._root)

  constructor(private readonly config: ConfigService) {}

  public connection() {
    if (!this._connection.supports.permanence)
      throw new Error('Persistent storage is required')
    return this._connection
  }

  public db(userId: string) {
    const conn = this.connection()
    const db = conn.sublevel(userId, { valueEncoding: 'utf8' })
    if (!db.supports.permanence)
      throw new Error('Persistent storage is required')
    return db
  }

  /**
   * Get value of key by user id
   * @param userId User id (base58-encoded pubkey)
   * @param key Key
   * @returns Value
   */
  async get(userId: string, key: string) {
    const db = this.db(userId)
    return await db.get(key)
  }

  /**
   * Get all values by user id
   * @param userId User id (base58-encoded pubkey)
   * @param key Key
   * @returns Value
   */
  async all(userId: string) {
    const db = this.db(userId)
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
    const db = this.db(userId)
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
    const db = this.db(userId)
    await db.del(key)
    return true
  }
}
