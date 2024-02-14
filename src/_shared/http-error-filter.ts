import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';
@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const exceptionMessage = exception.getResponse();
    const errorResponse = {
      code: status,
      timeStamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message: exceptionMessage || exception.message || null,
    };
    Logger.error(
      `${request.method}${request.url}`,
      JSON.stringify(errorResponse),
      'Exception Filter',
    );
    response.status(status).json(errorResponse);
  }
}
