
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { CustomException } from './custom-exception';
import { Message } from 'src/shared/interfaces/base_interface/ErrorMessage.interface';
import { LocaleService } from 'src/infrastructure/locales/base_locale/locales.service';

const customError = (exception) => {
  let statusCode;

  switch (exception.code) {
    case HttpStatus.NOT_FOUND:
      statusCode = HttpStatus.NOT_FOUND;
      break;
    case HttpStatus.BAD_REQUEST:
      statusCode = HttpStatus.BAD_REQUEST;
      break;
    case HttpStatus.FORBIDDEN:
      statusCode = HttpStatus.FORBIDDEN;
      break;
    default:
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      break;
  }

  return statusCode;
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor (public localeService : LocaleService, public logger : Logger) {}
  async catch (exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse<Response>();
    let errors : Message[] = [];


    const statusCode =
    exception instanceof HttpException ?
      exception.getStatus() :
      customError(exception);

    if (exception instanceof CustomException) {
      errors = exception.getResponse() as Message[];
      errors.forEach((error, index) => {
        errors[index].message = this.localeService.translate(
          error.message,
          { resource: error?.param });
      });
    } else {
      if (statusCode !== 500) {
        errors.push({ message: exception.message });
      }
    }


    if (errors.length) {
      this.logger.error({ message: errors });
    } else {
      this.logger.error(exception);
    }

    response
      .status(statusCode)
      .json({
        statusCode,
        timestamp: new Date().toISOString(),
        path: request.url,
        errors,
      });
  }
}
