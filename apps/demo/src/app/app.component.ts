import { Component } from '@angular/core';

import {
  LoggerEnvironmentConfig,
  LoggerFactoryService,
  LoggerService,
  LoggerServiceModule
} from 'angular-object-logger';

@Component({
  selector: 'test-app',
  // tslint:disable-next-line:i18n
  template: '<div>open console</div>'
})
export class AppComponent {
  constructor(
    private loggerFactory: LoggerFactoryService
  ) {
    const logger = loggerFactory.createLogger(this);

    // discarded by filter
    logger.trace('raw string log');
    logger.trace('String format log {0}: {1}', { message: 'log message' }, { x: 10, y: 20 });
    logger.trace({ members: ['object', 'message'] });
    logger.trace('log message with exception', new Error());
    logger.trace({ message: 'log message' }, new Error());

    // discarded by filter
    logger.debug('raw string log');
    logger.debug('String format log {0}: {1}', { message: 'log message' }, { x: 10, y: 20 });
    logger.debug({ members: ['object', 'message'] });
    logger.debug('log message with exception', new Error());
    logger.debug({ message: 'log message' }, new Error());

    logger.info('raw string log');
    logger.info('String format log {0}: {1}', { message: 'log message' }, { x: 10, y: 20 });
    logger.info({ members: ['object', 'message'] });
    logger.info('log message with exception', new Error());
    logger.info({ message: 'log message' }, new Error());

    logger.warn('raw string log');
    logger.warn('String format log {0}: {1}', { message: 'log message' }, { x: 10, y: 20 });
    logger.warn({ members: ['object', 'message'] });
    logger.warn('log message with exception', new Error());
    logger.warn({ message: 'log message' }, new Error());

    logger.error('raw string log');
    logger.error('String format log {0}: {1}', { message: 'log message' }, { x: 10, y: 20 });
    logger.error({ members: ['object', 'message'] });
    logger.error('log message with exception', new Error());
    logger.error({ message: 'log message' }, new Error());

    logger.fatal('raw string log');
    logger.fatal('String format log {0}: {1}', { message: 'log message' }, { x: 10, y: 20 });
    logger.fatal({ members: ['object', 'message'] });
    logger.fatal('log message with exception', new Error());
    logger.fatal({ message: 'log message' }, new Error());
  }
}
