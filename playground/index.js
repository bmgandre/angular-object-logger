"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * This is only for local test
 */
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var http_1 = require("@angular/common/http");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var angular_object_logger_1 = require("angular-object-logger");
exports.environment = {
    production: false,
    logger: {
        filters: [
            { source: '.*', minlevel: 'warn', maxlevel: 'fatal' }
        ],
        consoleTarget: {
            filters: [
                { source: '.*', minlevel: 'info', maxlevel: 'fatal' }
            ]
        }
    }
};
var AppComponent = (function () {
    function AppComponent(loggerFactory) {
        this.loggerFactory = loggerFactory;
        var logger = loggerFactory.createLogger(this);
        // Discarded by filter
        logger.trace('raw string log');
        logger.trace('String format log {0}: {1}', { message: 'log message' }, { x: 10, y: 20 });
        logger.trace({ members: ['object', 'message'] });
        logger.trace('log message with exception', new Error());
        logger.trace({ message: 'log message' }, new Error());
        // Discarded by filter
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
    AppComponent = __decorate([
        core_2.Component({
            selector: 'app-playground',
            template: "<div>open console</div>"
        })
    ], AppComponent);
    return AppComponent;
}());
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [AppComponent],
            declarations: [AppComponent],
            providers: [
                angular_object_logger_1.LoggerFactoryService,
                { provide: angular_object_logger_1.LoggerFactoryConfig, useValue: exports.environment }
            ],
            imports: [platform_browser_1.BrowserModule, http_1.HttpClientModule, angular_object_logger_1.LoggerServiceModule]
        })
    ], AppModule);
    return AppModule;
}());
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
