import { Injectable } from '@nestjs/common';
import { I18n } from 'i18n';

const i18n = new I18n();
i18n.configure({
  locales: [ 'en' ],
  extension: '.json',
  objectNotation: true,
  directoryPermissions: '755',
  directory: 'src/infrastructure/locales/en/',
});

@Injectable()
export class LocaleService {
  translate: (message: string, args?) => string = (message, args) => {
    return i18n.__(message, args);
  };
}
