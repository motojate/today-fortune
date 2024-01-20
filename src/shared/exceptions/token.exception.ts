import { HttpStatus } from '@nestjs/common';
import { BaseException } from 'src/shared/exceptions/base.exception';
import { ERROR_CODES } from 'src/shared/utils/response.util';

export class NullTokenException extends BaseException {
  constructor() {
    super(ERROR_CODES.NULL_TOKEN, 'NULL_TOKEN', HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidTokenException extends BaseException {
  constructor() {
    super(ERROR_CODES.INVALID_TOKEN, 'INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
  }
}

export class ExpiredTokenException extends BaseException {
  constructor() {
    super(ERROR_CODES.EXPIRED_TOKEN, 'EXPIRED_TOKEN', HttpStatus.UNAUTHORIZED);
  }
}
