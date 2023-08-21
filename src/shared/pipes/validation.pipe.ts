import { ArgumentMetadata, BadRequestException, ValidationPipe } from '@nestjs/common';
import { Error } from 'src/shared/interfaces/base_interface/Error.interface';
import { ErrorCreator } from 'src/shared/exception-handlers/custom-exception';
const importantPhrases = [ 'longer', 'equal', 'shorter', 'number', 'enum' ];
export class ValidationPipeBadRequest extends ValidationPipe {
  public async transform (value, metadata: ArgumentMetadata) {
    // eslint-disable-next-line new-cap
    const moduleName = new metadata.metatype().moduleName;


    try {
      return await super.transform(value, metadata);
    } catch (validationError) {
      if (validationError instanceof BadRequestException) {
        const { message: messages, statusCode } = validationError.getResponse() as Error;
        const errors = [];

        console.log(messages);

        messages.forEach((message) => {
          let tempArray = message.split(' ');


          const firstArg = tempArray[0];
          const lastArg = tempArray[tempArray.length - 1];
          let middleArgs = '';
          tempArray = importantPhrasesChecker(tempArray);

          tempArray.map(message => {
            middleArgs += `.${message}`;
          });
          errors.push({
            param: firstArg,
            message: `${moduleName}.${firstArg}${middleArgs}.${lastArg}`,
          });
        });

        throw new ErrorCreator(errors, statusCode);
      }
    }
  }
}

function importantPhrasesChecker (messageArray: string[]) {
  return messageArray.filter(message => {
    // if (!isNaN(+message)) {
    //   return true;
    // }

    if (importantPhrases.includes(message)) {
      return true;
    }
  });
}
