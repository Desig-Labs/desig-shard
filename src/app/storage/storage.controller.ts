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
import { Roles } from 'decorators/roles.decorator'
import { RolesGuard } from 'guards/roles.guard'
import { SignatureGuard } from 'guards/auth.guard'
import {
  ParseAddressPipe,
  ParseSignerAuthPipe,
} from 'pipelines/address.pipeline'
import { StorageService } from './storage.service'

@Controller('storage')
export class StorageController {
  constructor(private readonly service: StorageService) {}

  @Post()
  @Roles('multisig')
  @UseGuards(SignatureGuard, RolesGuard)
  async createStorage(
    @Auth(ParseSignerAuthPipe, ParseAddressPipe) multisigId: string,
  ) {
    return this.service.createStorage('', { multisigId })
  }

  @Get()
  @Roles('member')
  @UseGuards(SignatureGuard, RolesGuard)
  async readStorage(
    @Auth(ParseSignerAuthPipe, ParseAddressPipe) userId: string,
    @Query('multisig') multisigId: string,
  ) {
    return this.service.readStorage(userId, { multisigId })
  }

  @Patch()
  @Roles('multisig')
  @UseGuards(SignatureGuard, RolesGuard)
  async updateStorage(
    @Auth(ParseSignerAuthPipe, ParseAddressPipe) multisigId: string,
  ) {
    return this.service.updateStorage('', { multisigId })
  }

  @Delete()
  @Roles('multisig')
  @UseGuards(SignatureGuard, RolesGuard)
  async deleteStorage(
    @Auth(ParseSignerAuthPipe, ParseAddressPipe) userId: string,
    @Query('multisig', ParseAddressPipe) multisigId: string,
  ) {
    return this.service.deleteStorage(userId, { multisigId })
  }
}
