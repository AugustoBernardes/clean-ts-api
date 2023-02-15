import { IEncrypter } from '../../../data/protocols/criptography/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements IEncrypter {
  constructor (private readonly secret: string) {}
  async encrypt (value: string): Promise<string> {
    await jwt.sign({ id: value }, this.secret)
    return await new Promise(resolve => resolve('null'))
  };
}
