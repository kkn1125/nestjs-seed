import { ErrorResponseFormat } from '@common/response/response.format.dto';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const method = request.method;
    const path = request.originalUrl;

    if (exception instanceof HttpException) {
      const { message } = exception.getResponse() as HttpException;
      const status = exception.getStatus();
      console.log('status', status);
      response.status(status).json(ErrorResponseFormat(status, message));
      return;
    }

    console.log('exception', exception);

    response.status(400).json(ErrorResponseFormat(400, 'message'));
  }
}
