import {
  PipeTransform,
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common'
import { UserHeader } from 'app/auth/auth.service'
import { isAddress } from 'helpers/isAddress'

@Injectable()
export class ParseSignerAuthPipe implements PipeTransform {
  transform({ signerId }: UserHeader) {
    if (!signerId) throw new UnauthorizedException()
    return signerId
  }
}

@Injectable()
export class ParseAddressPipe implements PipeTransform {
  transform(value: string) {
    if (!value || !isAddress(value))
      throw new BadRequestException(
        'Invalid address. The address must be a base58 encoding.',
      )
    return value
  }
}
