import {
    DebugLogEntry,
    ErrorLogEntry,
    FatalLogEntry,
    InfoLogEntry,
    LogEntry,
    TraceLogEntry,
    WarnLogEntry
    } from '../../log-entry.model';
import { LoggerConsoleTargetService } from './logger-console-target.service';
import { MinMaxLevelLogFilter } from '../../filter/min-max-level-log-filter';
import { ConsoleLoggerTargetConfig } from '../config/console-logger-target-config';
import { FixedLevelLogFilter } from '../../filter/fixed-level-log-filter';
import { LogLevel } from '../../log-level.model';
import { MultiLevelLogFilter } from '../../filter/multi-level-log-filter';

describe('Console target service', () => {

    describe('given a console logger config accepting all sources and levels', () => {

        const filters = [ new MinMaxLevelLogFilter('.*') ];
        const loggerConfig = new ConsoleLoggerTargetConfig(filters);
        const consoleTarget = new LoggerConsoleTargetService(loggerConfig);

        describe('when a log is received', () => {
            beforeEach(() => {
                (global as any).console = {
                    log: jest.fn(),
                    warn: jest.fn(),
                    error: jest.fn()
                };
            });
            test('then the trace log is printed', () => {
                consoleTarget.log(new TraceLogEntry('test'));

                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
                expect(console.log)
                    .toHaveBeenCalledTimes(1);
            });
            test('then the debug is printed', () => {
                consoleTarget.log(new DebugLogEntry('test'));

                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
                expect(console.log)
                    .toHaveBeenCalledTimes(1);
            });
            test('then the info log is printed', () => {
                consoleTarget.log(new InfoLogEntry('test'));

                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
                expect(console.log)
                    .toHaveBeenCalledTimes(1);
            });
            test('then the warn log is printed', () => {
                consoleTarget.log(new WarnLogEntry('test'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(1);
            });
            test('then the error log is printed', () => {
                consoleTarget.log(new ErrorLogEntry('test'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(1);
            });
            test('then the fatal log is printed', () => {
                consoleTarget.log(new FatalLogEntry('test'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(1);
            });
        });

    });

    describe('given a console logger config accepting HomeComponent sources and all levels', () => {

        const filters = [ new MinMaxLevelLogFilter('HomeComponent') ];
        const loggerConfig = new ConsoleLoggerTargetConfig(filters);
        const consoleTarget = new LoggerConsoleTargetService(loggerConfig);

        describe('when a log is received', () => {
            beforeEach(() => {
                (global as any).console = {
                    log: jest.fn(),
                    warn: jest.fn(),
                    error: jest.fn()
                };
            });
            test('then the trace log from HomeComponent is printed', () => {
                consoleTarget.log(new TraceLogEntry('HomeComponent'));

                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
                expect(console.log)
                    .toHaveBeenCalledTimes(1);
            });
            test('then the debug from AppComponent is not printed', () => {
                consoleTarget.log(new DebugLogEntry('AppComponent'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
            });
            test('then the info log from Component is not printed', () => {
                consoleTarget.log(new InfoLogEntry('Component'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
            });
            test('then the warn log from Home is not printed', () => {
                consoleTarget.log(new WarnLogEntry('Home'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
            });
            test('then the error log from HomeService is not printed', () => {
                consoleTarget.log(new ErrorLogEntry('HomeService'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
            });
            test('then the fatal log from ComponentX is not printed', () => {
                consoleTarget.log(new FatalLogEntry('ComponentX'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
            });
        });

    });

    describe('given a console logger config accepting .*Component$ sources and all levels', () => {

        const filters = [ new MinMaxLevelLogFilter('.*Component$') ];
        const loggerConfig = new ConsoleLoggerTargetConfig(filters);
        const consoleTarget = new LoggerConsoleTargetService(loggerConfig);

        describe('when a log is received', () => {
            beforeEach(() => {
                (global as any).console = {
                    log: jest.fn(),
                    warn: jest.fn(),
                    error: jest.fn()
                };
            });
            test('then the trace log from HomeComponent is printed', () => {
                consoleTarget.log(new TraceLogEntry('HomeComponent'));

                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
                expect(console.log)
                    .toHaveBeenCalledTimes(1);
            });
            test('then the debug from AppComponent is not printed', () => {
                consoleTarget.log(new DebugLogEntry('AppComponent'));

                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
                expect(console.log)
                    .toHaveBeenCalledTimes(1);
            });
            test('then the info log from Component is not printed', () => {
                consoleTarget.log(new InfoLogEntry('Component'));

                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
                expect(console.log)
                    .toHaveBeenCalledTimes(1);
            });
            test('then the warn log from Home is not printed', () => {
                consoleTarget.log(new WarnLogEntry('Home'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
            });
            test('then the error log from HomeService is not printed', () => {
                consoleTarget.log(new ErrorLogEntry('HomeService'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
            });
            test('then the fatal log from ComponentX is not printed', () => {
                consoleTarget.log(new FatalLogEntry('ComponentX'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
            });
        });

    });

    describe('given a console logger config accepting .*Component sources and all levels', () => {

        const filters = [ new MinMaxLevelLogFilter('.*Component') ];
        const loggerConfig = new ConsoleLoggerTargetConfig(filters);
        const consoleTarget = new LoggerConsoleTargetService(loggerConfig);

        describe('when a log is received', () => {
            beforeEach(() => {
                (global as any).console = {
                    log: jest.fn(),
                    warn: jest.fn(),
                    error: jest.fn()
                };
            });
            test('then the trace log from HomeComponent is printed', () => {
                consoleTarget.log(new TraceLogEntry('HomeComponent'));

                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
                expect(console.log)
                    .toHaveBeenCalledTimes(1);
            });
            test('then the debug from AppComponent is not printed', () => {
                consoleTarget.log(new DebugLogEntry('AppComponent'));

                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
                expect(console.log)
                    .toHaveBeenCalledTimes(1);
            });
            test('then the info log from Component is not printed', () => {
                consoleTarget.log(new InfoLogEntry('Component'));

                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
                expect(console.log)
                    .toHaveBeenCalledTimes(1);
            });
            test('then the warn log from Home is not printed', () => {
                consoleTarget.log(new WarnLogEntry('Home'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
            });
            test('then the error log from HomeService is not printed', () => {
                consoleTarget.log(new ErrorLogEntry('HomeService'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
            });
            test('then the fatal log from ComponentX is not printed', () => {
                consoleTarget.log(new FatalLogEntry('ComponentX'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(1);
            });
        });

    });

    describe('given a console logger config accepting all sources and info level', () => {

        const filters = [ new FixedLevelLogFilter('.*', LogLevel.info) ];
        const loggerConfig = new ConsoleLoggerTargetConfig(filters);
        const consoleTarget = new LoggerConsoleTargetService(loggerConfig);

        describe('when a log is received', () => {
            beforeEach(() => {
                (global as any).console = {
                    log: jest.fn(),
                    warn: jest.fn(),
                    error: jest.fn()
                };
            });
            test('then the trace log is not printed', () => {
                consoleTarget.log(new TraceLogEntry('test'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
            });
            test('then the debug is not printed', () => {
                consoleTarget.log(new DebugLogEntry('test'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
            });
            test('then the info log is printed', () => {
                consoleTarget.log(new InfoLogEntry('test'));

                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
                expect(console.log)
                    .toHaveBeenCalledTimes(1);
            });
            test('then the warn log is not printed', () => {
                consoleTarget.log(new WarnLogEntry('test'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
            });
            test('then the error log is not printed', () => {
                consoleTarget.log(new ErrorLogEntry('test'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
            });
            test('then the fatal log is not printed', () => {
                consoleTarget.log(new FatalLogEntry('test'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
            });
        });

    });

    describe('given a console logger config accepting all sources and (trace or fatal) level', () => {

        const filters = [ new MultiLevelLogFilter('.*', [ LogLevel.trace, LogLevel.fatal ]) ];
        const loggerConfig = new ConsoleLoggerTargetConfig(filters);
        const consoleTarget = new LoggerConsoleTargetService(loggerConfig);

        describe('when a log is received', () => {
            beforeEach(() => {
                (global as any).console = {
                    log: jest.fn(),
                    warn: jest.fn(),
                    error: jest.fn()
                };
            });
            test('then the trace log is printed', () => {
                consoleTarget.log(new TraceLogEntry('test'));

                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
                expect(console.log)
                    .toHaveBeenCalledTimes(1);
            });
            test('then the debug is not printed', () => {
                consoleTarget.log(new DebugLogEntry('test'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
            });
            test('then the info log is not printed', () => {
                consoleTarget.log(new InfoLogEntry('test'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
            });
            test('then the warn log is not printed', () => {
                consoleTarget.log(new WarnLogEntry('test'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
            });
            test('then the error log is not printed', () => {
                consoleTarget.log(new ErrorLogEntry('test'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(0);
            });
            test('then the fatal log is printed', () => {
                consoleTarget.log(new FatalLogEntry('test'));

                expect(console.log)
                    .toHaveBeenCalledTimes(0);
                expect(console.warn)
                    .toHaveBeenCalledTimes(0);
                expect(console.error)
                    .toHaveBeenCalledTimes(1);
            });
        });

    });

});
