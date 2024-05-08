import { HttpException, HttpStatus } from '@nestjs/common';

export class APIException extends HttpException {
  constructor(
    message: string,
    code: string,
    status: HttpStatus,
    payload?: any,
  ) {
    super(
      {
        message: message,
        code: code,
        status: status,
        payload: payload,
      },
      status,
    );
  }
}
