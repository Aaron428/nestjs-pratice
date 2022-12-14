import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}
  sign(payload: object): string {
    return sign(payload, this.options.privateKey);
  }
  verify(token: string) {
    return verify(token, this.options.privateKey);
  }
}
