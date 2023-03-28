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
import {
  ParseAddressPipe,
  ParseSignerAuthPipe,
} from 'pipelines/address.pipeline'
import { StorageService } from './storage.service'

@Controller('storage')
export class StorageController {
  constructor(private readonly service: StorageService) {}

  @Post()
  @UseGuards(SignatureGuard)
  async createStorage(
    @Auth(ParseSignerAuthPipe, ParseAddressPipe) multisigId: string,
  ) {
    return this.service.createStorage('', { multisigId })
  }

  @Get()
  @UseGuards(SignatureGuard)
  async readStorage(
    @Auth(ParseSignerAuthPipe, ParseAddressPipe) userId: string,
    @Query('multisig') multisigId: string,
  ) {
    return this.service.readStorage(userId, { multisigId })
  }

  @Patch()
  @UseGuards(SignatureGuard)
  async updateStorage(
    @Auth(ParseSignerAuthPipe, ParseAddressPipe) multisigId: string,
  ) {
    return this.service.updateStorage('', { multisigId })
  }

  @Delete()
  @UseGuards(SignatureGuard)
  async deleteStorage(
    @Auth(ParseSignerAuthPipe, ParseAddressPipe) userId: string,
    @Query('multisig', ParseAddressPipe) multisigId: string,
  ) {
    return this.service.deleteStorage(userId, { multisigId })
  }
}
