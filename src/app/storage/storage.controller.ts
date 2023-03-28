import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { Auth } from 'decorators/auth.decorator'
import { SignatureGuard } from 'guards/sig.guard'
import { ParseAddressPipe, ParseUserAuthPipe } from 'pipelines/address.pipeline'
import { StorageService } from './storage.service'

@Controller('storage')
export class StorageController {
  constructor(private readonly service: StorageService) {}

  @Post()
  async createStorage(@Query('multisig') multisigId: string) {
    return this.service.createStorage('', { multisigId })
  }

  @Get()
  @UseGuards(SignatureGuard)
  async readStorage(
    @Auth(ParseUserAuthPipe, ParseAddressPipe) userId: string,
    @Query('multisig') multisigId: string,
  ) {
    return this.service.readStorage(userId, { multisigId })
  }

  @Patch()
  async updateStorage(@Query('multisig') multisigId: string) {
    return this.service.updateStorage('', { multisigId })
  }

  @Delete()
  async deleteStorage(@Query('multisig') multisigId: string) {
    return this.service.deleteStorage('', { multisigId })
  }
}
