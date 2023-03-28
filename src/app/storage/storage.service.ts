import { Injectable } from '@nestjs/common'
import { LevelService } from 'app/level/level.service'

@Injectable()
export class StorageService {
  constructor(private readonly level: LevelService) {}

  async createStorage(userId: string, { multisigId }: { multisigId?: string }) {
    console.log(userId, multisigId)
    return { userId, multisigId }
  }

  async readStorage(userId: string, { multisigId }: { multisigId?: string }) {
    if (!multisigId) return this.level.all(userId)
    return this.level.get(userId, multisigId)
  }

  async updateStorage(userId: string, { multisigId }: { multisigId?: string }) {
    console.log(userId, multisigId)
    return { userId, multisigId }
  }

  async deleteStorage(userId: string, { multisigId }: { multisigId?: string }) {
    return this.level.delete(userId, multisigId)
  }
}
