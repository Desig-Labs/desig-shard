import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { Auth } from 'decorators/auth.decorator'
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
  @UseGuards(SignatureGuard)
  async createStorage(
    @Auth(ParseSignerAuthPipe, ParseAddressPipe) multisigId: string,
    @Body('users') users: Record<string, string>,
  ) {
    return this.service.upsertStorage(multisigId, users)
  }

  @Get()
  @UseGuards(SignatureGuard)
  async readStorage(
    @Auth(ParseSignerAuthPipe, ParseAddressPipe) userId: string,
    @Query('multisig') multisigId: string,
  ) {
    return this.service.readStorage(userId, multisigId)
  }

  @Patch()
  @UseGuards(SignatureGuard)
  async updateStorage(
    @Auth(ParseSignerAuthPipe, ParseAddressPipe) multisigId: string,
    @Body('users') users: Record<string, string>,
  ) {
    return this.service.upsertStorage(multisigId, users)
  }

  @Delete(':multisig')
  @UseGuards(SignatureGuard)
  async deleteStorage(
    @Auth(ParseSignerAuthPipe, ParseAddressPipe) userId: string,
    @Param('multisig', ParseAddressPipe) multisigId: string,
  ) {
    return this.service.deleteStorage(userId, multisigId)
  }
}
