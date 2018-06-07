[![Build Status](https://travis-ci.org/bmgandre/angular-object-logger.svg?branch=master)](https://travis-ci.org/bmgandre/angular-object-logger)
[![codecov](https://codecov.io/gh/bmgandre/angular-object-logger/branch/master/graph/badge.svg)](https://codecov.io/gh/bmgandre/angular-object-logger)

[![NPM](https://nodei.co/npm/angular-object-logger.png)](https://nodei.co/npm/angular-object-logger/)

# angular-object-logger

Send objects logs to console or web.
angular-object-logger provides a multi target logger service with filtering capabilities.

## Installing

Using npm install angular-object-logger alongside with its peer dependencies :

```bash
npm install angular-object-logger --save
npm install @angular/common --save
npm install stacktrace-js --save
```

## Configure your project

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import {
  LoggerServiceModule,
  LoggerService,
  LoggerFactoryConfig,
  LoggerFactoryService
} from 'angular-object-logger';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoggerServiceModule
  ],
  providers: [
    { provide: LoggerEnvironmentConfig, useValue: environment }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

Edit `environment.ts` and configure global and target filters:

```javascript
export const environment = {
  production: false,
  logger: {
    filters: [
      { source: '.*', minlevel: 'warn', maxlevel: 'fatal' }
    ],
    consoleTarget: {
      filters: [
        { source: 'AppComponent', minlevel: 'info', maxlevel: 'fatal' },
        { source: 'HomeComponent', level: 'info' },
        { source: 'SearchComponent', levels: [ 'trace', 'debug' ] },
      ]
    },
    webTarget: {
      endpoint: 'http://localhost:4000/'
    }
  }
};
```

```typescript
@Component({
  selector: 'app-playground',
  template: `<div></div>`
})
class AppComponent {
  constructor(
    private loggerFactory: LoggerFactoryService
  ) {
    const logger = loggerFactory.createLogger(this);

    logger.trace('string log');
    logger.debug('String format log {0}: {1}', { name: 'Andre' }, { x: 10, y: 20 });
    logger.info({ list: ['object', 'log'] });
    logger.warn('string message with exception', new Error());
    logger.error({ message: 'object with exception' }, new Error());
    logger.fatal('string log message with exception', new Error());
  }
}
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
npm run build
```

To lint all `*.ts` files:

```bash
npm run lint
```

## License

MIT © [André Gomes](mailto:bmg.andre@gmail.com)
