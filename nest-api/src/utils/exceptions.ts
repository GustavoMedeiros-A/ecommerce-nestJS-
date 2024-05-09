import { HttpStatus } from '@nestjs/common';
import { APIException } from './api.exception';

export class NotFoundException extends APIException {
  constructor(message: string, payload?: any) {
    super(message, '@okra/notfound', HttpStatus.NOT_FOUND, payload);
  }
}

export class UnauthorizedException extends APIException {
  constructor(message: string, payload?: any) {
    super(message, '@okra/unauthorized', HttpStatus.NOT_FOUND, payload);
  }
}
