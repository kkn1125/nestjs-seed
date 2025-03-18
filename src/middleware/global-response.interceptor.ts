import { SuccessResponseFormat } from '@common/response/response.format.dto';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class GlobalResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getRequest<Response>();

    const status = response.statusCode;

    return next
      .handle()
      .pipe(map((data) => SuccessResponseFormat(status, data)));
  }
}
