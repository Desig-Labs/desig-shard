import { Injectable } from '@nestjs/common'

@Injectable()
export class StorageService {
  async createStorage(userId: string, { multisigId }: { multisigId?: string }) {
    console.log(userId, multisigId)
    return ''
  }

  async readStorage(userId: string, { multisigId }: { multisigId?: string }) {
    console.log(userId, multisigId)
    return ''
  }

  async updateStorage(userId: string, { multisigId }: { multisigId?: string }) {
    console.log(userId, multisigId)
    return ''
  }

  async deleteStorage(userId: string, { multisigId }: { multisigId?: string }) {
    console.log(userId, multisigId)
    return ''
  }
}
