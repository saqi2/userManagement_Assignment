import { HttpException } from '@nestjs/common';
import { Message } from 'src/shared/interfaces/base_interface/ErrorMessage.interface';
export abstract class CustomException extends HttpException {
  abstract statusCode: number
  abstract get serializeErrors(): Message[];
  abstract getStatus(): number;
}

export class ErrorCreator extends CustomException {
  constructor (public messages: Message[], public statusCode: number) {
    super(messages, statusCode);
  }

  getStatus () {
    return this.statusCode;
  }

  get serializeErrors () {
    return this.messages;
  }
}
