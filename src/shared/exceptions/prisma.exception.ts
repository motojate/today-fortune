import { HttpStatus } from '@nestjs/common';
import { BaseException } from 'src/shared/exceptions/base.exception';
import { ERROR_CODES } from 'src/shared/utils/response.util';

export class PrismaException extends BaseException {
  constructor(err: any) {
    super(ERROR_CODES.NETWORK_ERROR, err, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
