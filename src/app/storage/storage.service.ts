import { Injectable } from '@nestjs/common'

@Injectable()
export class StorageService {
  async createStorage(userId: string, { multisigId }: { multisigId?: string }) {
    console.log(userId, multisigId)
    return { userId, multisigId }
  }

  async readStorage(userId: string, { multisigId }: { multisigId?: string }) {
    return { userId, multisigId }
  }

  async updateStorage(userId: string, { multisigId }: { multisigId?: string }) {
    console.log(userId, multisigId)
    return { userId, multisigId }
  }

  async deleteStorage(userId: string, { multisigId }: { multisigId?: string }) {
    console.log(userId, multisigId)
    return { userId, multisigId }
  }
}
