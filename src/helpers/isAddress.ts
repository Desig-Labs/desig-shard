import { isBase58 } from 'class-validator'

/**
 * Validate Desig (base58 encoding) address
 * @param address Desig address
 * @returns true/false
 */
export const isAddress = (address: string | undefined): address is string => {
  if (!address) return false
  return isBase58(address)
}
