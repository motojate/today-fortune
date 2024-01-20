import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();

    return next.handle().pipe(
      tap(() => {
        response.on('finish', () => {
          const { method, url, ip } = request;
          const { statusCode } = response;
          const contentLength = response.get('content-length') ?? 0;
          const userAgent = request.get('user-agent') || '';

          const logMessage = `${method} ${url} ${statusCode} ${contentLength} - ${
            Date.now() - now
          }ms - ${userAgent} ${ip}`;
          this.logger.log(logMessage);
        });
      }),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }
}
