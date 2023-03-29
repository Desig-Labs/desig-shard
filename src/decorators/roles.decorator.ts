import { SetMetadata } from '@nestjs/common'

export type UserRole = 'member' | 'multisig'

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles)
