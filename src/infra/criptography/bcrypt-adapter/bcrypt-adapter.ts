import { IHasher } from '../../../data/protocols/criptography/hasher'
import { IHashCompare } from '../../../data/protocols/criptography/hash-compare'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements IHasher, IHashCompare {
  constructor (
    private readonly salt: number
  ) {}

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}
