import {
    DebugLogEntry,
    ErrorLogEntry,
    FatalLogEntry,
    InfoLogEntry,
    LogEntry,
    TraceLogEntry,
    WarnLogEntry
    } from '../log-entry.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoggerWebTargetService } from './logger-web-target.service';
import { MinMaxLevelLogFilter } from '../filter/min-max-level-log-filter';
import { TestBed } from '@angular/core/testing';
import { WebLoggerTargetConfig } from '../config/web-logger-target-config';

describe('Web target service', () => {
    const url = 'http://localhost:5566/';
    const secret = 'secret';

    const headerAuthorization = 'Authorization';
    const headerContentType = 'Content-Type';
    const contentType = 'application/json';

    describe('given a web logger config accepting all sources and levels', () => {

        describe('when a log is received', () => {

            const filters = [ new MinMaxLevelLogFilter('.*') ];
            const loggerConfig = new WebLoggerTargetConfig(filters, url, secret);

            let webTarget: LoggerWebTargetService;
            let httpClient: HttpClient;
            let httpTestingController: HttpTestingController;

            beforeEach(() => {
                TestBed.configureTestingModule({
                    imports: [ HttpClientTestingModule ]
                });

                httpClient = TestBed.get(HttpClient);
                httpTestingController = TestBed.get(HttpTestingController);
                webTarget = new LoggerWebTargetService(loggerConfig, httpClient);
            });

            afterEach(() => {
                const req = httpTestingController.expectOne(url);

                expect(req.request.method)
                    .toEqual('POST');

                expect(req.request.headers.keys())
                    .toContain(headerAuthorization);
                expect(req.request.headers.get(headerAuthorization))
                    .toEqual(secret);

                expect(req.request.headers.keys())
                    .toContain(headerContentType);
                expect(req.request.headers.get(headerContentType))
                    .toEqual(contentType);

                httpTestingController.verify();
            });

            test('then the trace log is sent', () => {
                webTarget.log(new TraceLogEntry('test'));
            });
            test('then the debug log is sent', () => {
                webTarget.log(new DebugLogEntry('test'));
            });
            test('then the info log is sent', () => {
                webTarget.log(new InfoLogEntry('test'));
            });
            test('then the warn log is sent', () => {
                webTarget.log(new WarnLogEntry('test'));
            });
            test('then the error log is sent', () => {
                webTarget.log(new ErrorLogEntry('test'));
            });
            test('then the fatal log is sent', () => {
                webTarget.log(new FatalLogEntry('test'));
            });
        });

    });

    describe('given a web logger config without endpoint and secret', () => {

        describe('when a log is received', () => {

            const filters = [ new MinMaxLevelLogFilter('.*') ];
            const loggerConfig = new WebLoggerTargetConfig(filters, undefined, undefined);

            let webTarget: LoggerWebTargetService;
            let httpClient: HttpClient;
            let httpTestingController: HttpTestingController;

            beforeEach(() => {
                TestBed.configureTestingModule({
                    imports: [ HttpClientTestingModule ]
                });

                httpClient = TestBed.get(HttpClient);
                httpTestingController = TestBed.get(HttpTestingController);
                webTarget = new LoggerWebTargetService(loggerConfig, httpClient);
            });

            afterEach(() => {
                httpTestingController.expectNone(url);
                httpTestingController.verify();
            });

            test('then the trace log is not sent', () => {
                webTarget.log(new TraceLogEntry('test'));
            });
            test('then the debug log is not sent', () => {
                webTarget.log(new DebugLogEntry('test'));
            });
            test('then the info log is not sent', () => {
                webTarget.log(new InfoLogEntry('test'));
            });
            test('then the warn log is not sent', () => {
                webTarget.log(new WarnLogEntry('test'));
            });
            test('then the error log is not sent', () => {
                webTarget.log(new ErrorLogEntry('test'));
            });
            test('then the fatal log is not sent', () => {
                webTarget.log(new FatalLogEntry('test'));
            });
        });

    });

    describe('given a web logger config with endpoint but no secret', () => {

        describe('when a log is received', () => {

            const filters = [ new MinMaxLevelLogFilter('.*') ];
            const loggerConfig = new WebLoggerTargetConfig(filters, url, undefined);

            let webTarget: LoggerWebTargetService;
            let httpClient: HttpClient;
            let httpTestingController: HttpTestingController;

            beforeEach(() => {
                TestBed.configureTestingModule({
                    imports: [ HttpClientTestingModule ]
                });

                httpClient = TestBed.get(HttpClient);
                httpTestingController = TestBed.get(HttpTestingController);
                webTarget = new LoggerWebTargetService(loggerConfig, httpClient);
            });

            afterEach(() => {
                const req = httpTestingController.expectOne(url);

                expect(req.request.method)
                    .toEqual('POST');

                expect(req.request.headers.keys())
                    .toContain(headerContentType);
                expect(req.request.headers.get(headerContentType))
                    .toEqual(contentType);

                expect(req.request.headers.has(headerAuthorization))
                    .toBeFalsy();

                httpTestingController.verify();
            });

            test('then the request does not contain authorization header', () => {
                webTarget.log(new TraceLogEntry('test'));
            });
            test('then the request does not contain authorization header', () => {
                webTarget.log(new DebugLogEntry('test'));
            });
            test('then the request does not contain authorization header', () => {
                webTarget.log(new InfoLogEntry('test'));
            });
            test('then the request does not contain authorization header', () => {
                webTarget.log(new WarnLogEntry('test'));
            });
            test('then the request does not contain authorization header', () => {
                webTarget.log(new ErrorLogEntry('test'));
            });
            test('then the request does not contain authorization header', () => {
                webTarget.log(new FatalLogEntry('test'));
            });
        });

    });
});
