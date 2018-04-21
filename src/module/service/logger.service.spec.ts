import { LoggerService } from './logger.service';
import { LoggerTargetService } from './target/logger-target-service';
import { LoggerConsoleTargetService } from './target/logger-console-target.service';
import * as StackTrace from 'stacktrace-js';
import { LogEntry } from './log-entry.model';
import { LogLevel } from './log-level.model';

jest.mock('stacktrace-js');

describe('Logger Service', () => {

    let loggerService: LoggerService;
    let loggerTargetService: LoggerTargetService;
    let mockLoggerTargetService: jest.Mock<LoggerTargetService>;
    let logEntry: LogEntry;
    let requestDateTime: Date;
    let stackframeList: Array<any>;

    beforeAll(() => {
        mockLoggerTargetService = jest.fn<LoggerTargetService>(() => ({
            log: jest.fn((log: LogEntry) => logEntry = log)
        }));

        loggerTargetService = new mockLoggerTargetService();
        loggerService = new LoggerService([ loggerTargetService ]);
        loggerService.source = 'logger.service.spec.ts';
        requestDateTime = new Date();

        stackframeList = [
            {
                columnNumber: 10,
                lineNumber: 60,
                fileName: 'logger.service.ts',
                functionName: 'LoggerService.trace',
                source: 'at LoggerService.trace (logger.service.ts:68:16)'
            },
            {
                columnNumber: 20,
                lineNumber: 100,
                fileName: 'logger.service.spec.ts',
                functionName: 'test',
                source: 'at test (logger.service.spec.ts:100:20)'
            }
        ];
        (StackTrace as any).__setMockStackTrace(stackframeList);
    });

    afterAll(() => {
        mockLoggerTargetService.mockClear();

        expect(loggerService.source)
            .toEqual('logger.service.spec.ts');

        expect(loggerTargetService.log)
            .toHaveBeenCalled();
        expect(loggerTargetService.log)
            .toHaveBeenCalledTimes(1);

        expect(logEntry.logger)
            .toEqual('logger.service.spec.ts');
        expect(logEntry.timestamp.getUTCMilliseconds())
            .toBeGreaterThanOrEqual(requestDateTime.getUTCMilliseconds());
        expect(logEntry.source.file)
            .toEqual(stackframeList[stackframeList.length - 1].fileName);
        expect(logEntry.source.line)
            .toEqual(stackframeList[stackframeList.length - 1].lineNumber);
        expect(logEntry.source.pos)
            .toEqual(stackframeList[stackframeList.length - 1].columnNumber);
        expect(logEntry.source.method)
            .toEqual(stackframeList[stackframeList.length - 1].functionName);
        expect(logEntry.source.path)
            .toEqual(stackframeList[stackframeList.length - 1].source);
        expect(logEntry.source.stack)
            .toEqual(stackframeList.map(sf => sf.toString())
                .join('\n'));
    });

    describe('given a logger service with a target accepting all sources and levels', () => {

        describe('when a text message log is sent', () => {

            function checkMessage(message: string): void {
                expect((logEntry as any).message)
                    .toEqual(message);
            }

            test('then the trace log is printed', async () => {
                const message = 'trace string message';
                await loggerService.trace(message);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.trace]);
                checkMessage(message);
            });

            test('then the debug log is printed', async () => {
                const message = 'debug string message';
                await loggerService.debug(message);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.debug]);
                checkMessage(message);
            });

            test('then the info log is printed', async () => {
                const message = 'info string message';
                await loggerService.info(message);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.info]);
                checkMessage(message);
            });

            test('then the warn log is printed', async () => {
                const message = 'warn string message';
                await loggerService.warn(message);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.warn]);
                checkMessage(message);
            });

            test('then the error log is printed', async () => {
                const message = 'error string message';
                await loggerService.error(message);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.error]);
                checkMessage(message);
            });

            test('then the fatal log is printed', async () => {
                const message = 'fatal string message';
                await loggerService.fatal(message);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.fatal]);
                checkMessage(message);
            });

        });

        describe('when a log containing text message with format is sent', () => {
            function checkMessage(message: string, properties: Array<any>): void {
                const expectedMessage = message.replace(/{(\d+)}/g, (match, index) => {
                    return typeof properties[index] !== 'undefined'
                      ? (typeof properties[index] === 'object') ? JSON.stringify(properties[index]) : properties[index]
                      : match;
                  });

                expect((logEntry as any).message)
                    .toEqual(expectedMessage);
            }

            test('then the trace log is printed', async () => {
                const message = 'String format log {0}: {1}';
                const properties = [ { message: 'log message' }, { x: 10, y: 20 } ];
                await loggerService.trace(message, ...properties);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.trace]);
                checkMessage(message, properties);
            });

            test('then the debug log is printed', async () => {
                const message = 'String format log {0}: {1}';
                const properties = [ { message: 'log message' }, 1000 ];
                await loggerService.debug(message, ...properties);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.debug]);
                checkMessage(message, properties);
            });

            test('then the info log is printed', async () => {
                const message = 'String format log {0}: {1}';
                const properties = [ { message: 'log message' }, new Date() ];
                await loggerService.info(message, ...properties);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.info]);
                checkMessage(message, properties);
            });

            test('then the warn log is printed', async () => {
                const message = 'String format log {0}: {1}';
                const properties = [ { message: 'log message' }, 'testing' ];
                await loggerService.warn(message, ...properties);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.warn]);
                checkMessage(message, properties);
            });

            test('then the error log is printed', async () => {
                const message = 'String format log {0}: {1}';
                const properties = [ { message: 'log message' }, { x: 10 } ];
                await loggerService.error(message, ...properties);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.error]);
                checkMessage(message, properties);
            });

            test('then the fatal log is printed', async () => {
                const message = 'String format log {0}: {1}';
                const properties = [ { message: 'log message' }, { y: 20 } ];
                await loggerService.fatal(message, ...properties);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.fatal]);
                checkMessage(message, properties);
            });
        });

        describe('when a log containing text message and exception is sent', () => {

            function checkMessage(message: string, exception: Error): void {
                expect((logEntry as any).message)
                    .toEqual(message);
                expect(((logEntry as any).exception as Error).message)
                    .toEqual(exception.message);
            }

            test('then the trace log is printed', async () => {
                const message = 'message with exception';
                const exception = new Error('Exception Test');
                await loggerService.trace(message, exception);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.trace]);
                checkMessage(message, exception);
            });

            test('then the debug log is printed', async () => {
                const message = 'message with exception';
                const exception = new Error('Exception Test');
                await loggerService.debug(message, exception);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.debug]);
                checkMessage(message, exception);
            });

            test('then the info log is printed', async () => {
                const message = 'message with exception';
                const exception = new Error('Exception Test');
                await loggerService.info(message, exception);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.info]);
                checkMessage(message, exception);
            });

            test('then the warn log is printed', async () => {
                const message = 'message with exception';
                const exception = new Error('Exception Test');
                await loggerService.warn(message, exception);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.warn]);
                checkMessage(message, exception);
            });

            test('then the error log is printed', async () => {
                const message = 'message with exception';
                const exception = new Error('Exception Test');
                await loggerService.error(message, exception);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.error]);
                checkMessage(message, exception);
            });

            test('then the fatal log is printed', async () => {
                const message = 'message with exception';
                const exception = new Error('Exception Test');
                await loggerService.fatal(message, exception);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.fatal]);
                checkMessage(message, exception);
            });
        });

        describe('when a log containing an object is sent', () => {
            function checkObjectProperties(object: any): void {
                expect(JSON.stringify((logEntry as any).object))
                    .toEqual(JSON.stringify(object));
            }

            test('then the trace log is printed', async () => {
                const object = {
                    x: 10,
                    y: 200
                };
                await loggerService.trace(object);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.trace]);
                checkObjectProperties(object);
            });

            test('then the debug log is printed', async () => {
                const object = {
                    str: 'string'
                };
                await loggerService.debug(object);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.debug]);
                checkObjectProperties(object);
            });

            test('then the info log is printed', async () => {
                const object = {
                    complex: {
                        x: 1,
                        y: 2
                    }
                };
                await loggerService.info(object);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.info]);
                checkObjectProperties(object);
            });

            test('then the warn log is printed', async () => {
                const object = {
                    str: 'string',
                    count: 200,
                    complex: {
                        x: 1,
                        y: 2
                    }
                };
                await loggerService.warn(object);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.warn]);
                checkObjectProperties(object);
            });

            test('then the error log is printed', async () => {
                const object = {
                    x: 10,
                    y: 200
                };
                await loggerService.error(object);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.error]);
                checkObjectProperties(object);
            });

            test('then the fatal log is printed', async () => {
                const object = {
                    x: 10,
                    y: 200
                };
                await loggerService.fatal(object);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.fatal]);
                checkObjectProperties(object);
            });
        });

        describe('when a log containing an object and an exception is sent', () => {
            function checkObjectProperties(object: any, exception: Error): void {
                expect(JSON.stringify((logEntry as any).object))
                    .toEqual(JSON.stringify(object));
                expect(((logEntry as any).exception as Error).message)
                    .toEqual(exception.message);
            }

            test('then the trace log is printed', async () => {
                const object = {
                    x: 10,
                    y: 200
                };
                const exception = new Error('Exception Test');
                await loggerService.trace(object, exception);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.trace]);
                checkObjectProperties(object, exception);
            });

            test('then the debug log is printed', async () => {
                const object = {
                    str: 'string'
                };
                const exception = new Error('Exception Test');
                await loggerService.debug(object, exception);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.debug]);
                checkObjectProperties(object, exception);
            });

            test('then the info log is printed', async () => {
                const object = {
                    complex: {
                        x: 1,
                        y: 2
                    }
                };
                const exception = new Error('Exception Test');
                await loggerService.info(object, exception);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.info]);
                checkObjectProperties(object, exception);
            });

            test('then the warn log is printed', async () => {
                const object = {
                    str: 'string',
                    count: 200,
                    complex: {
                        x: 1,
                        y: 2
                    }
                };
                const exception = new Error('Exception Test');
                await loggerService.warn(object, exception);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.warn]);
                checkObjectProperties(object, exception);
            });

            test('then the error log is printed', async () => {
                const object = {
                    x: 10,
                    y: 200
                };
                const exception = new Error('Exception Test');
                await loggerService.error(object, exception);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.error]);
                checkObjectProperties(object, exception);
            });

            test('then the fatal log is printed', async () => {
                const object = {
                    x: 10,
                    y: 200
                };
                const exception = new Error('Exception Test');
                await loggerService.fatal(object, exception);

                expect(logEntry.level)
                    .toEqual(LogLevel[LogLevel.fatal]);
                checkObjectProperties(object, exception);
            });
        });
    });
});
