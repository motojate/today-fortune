import { HttpStatus } from '@nestjs/common';
import { BaseException } from 'src/shared/exceptions/base.exception';
import { ERROR_CODES } from 'src/shared/utils/response.util';

export class InvalidAuthException extends BaseException {
  constructor() {
    super(ERROR_CODES.INVALID_USER, 'INVALID_USER', HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidPasswordException extends BaseException {
  constructor() {
    super(
      ERROR_CODES.PASSWORD_FAILED,
      'PASSWORD_FAILED',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
