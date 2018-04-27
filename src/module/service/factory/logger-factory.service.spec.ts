import { ConsoleLoggerTargetConfig } from '../console/config/console-logger-target-config';
import { LogFilter } from '../filter/log-filter';
import { LoggerConfig } from '../config/logger-config';
import { LoggerConfigReader } from '../config/logger-config-reader';
import { LoggerConsoleTargetService } from '../console/target/logger-console-target.service';
import { LoggerFactoryService } from './logger-factory.service';
import { LoggerService } from '../logger.service';
import { LoggerWebTargetService } from '../web/target/logger-web-target.service';
import { WebLoggerTargetConfig } from '../web/config/web-logger-target-config';

describe('Logger factory service', () => {

    describe('given a logger factory service', () => {

        let mockLoggerConfigReader: jest.Mock<LoggerConfigReader>;
        let loggerConfig: LoggerConfig;
        let loggerConfigReader: LoggerConfigReader;
        let loggerFactoryService: LoggerFactoryService;
        let loggerService: LoggerService;

        class TestSource { }

        function setupMocks(): void {
            mockLoggerConfigReader = jest.fn<LoggerConfigReader>(() => ({
                loadLoggerConfiguration: jest.fn(() => loggerConfig)
            }));
            loggerConfigReader = new mockLoggerConfigReader();
        }

        describe('when a request to create a logger with console and web target is sent', () => {

            beforeAll(() => {
                loggerConfig = new LoggerConfig();
                loggerConfig.consoleTarget = new ConsoleLoggerTargetConfig([]);
                loggerConfig.webTarget = new WebLoggerTargetConfig([], '', '');
                setupMocks();

                loggerFactoryService = new LoggerFactoryService(loggerConfigReader, undefined);
                loggerService = loggerFactoryService.createLogger(new TestSource());
            });

            test('then the logger is created', () => {
                expect(loggerService).not
                    .toBeNull();
            });

            test('then the configuration reader is called', () => {
                expect(loggerConfigReader.loadLoggerConfiguration)
                    .toHaveBeenCalled();
            });

            test('then the logger service source is "TestSource"', () => {
                expect(loggerService.source)
                    .toBe('TestSource');
            });

            test('then factory contains 2 targets', () => {
                expect(loggerFactoryService.loggerTargets.length)
                    .toBe(2);
            });
        });

        describe('when a request to create a logger with console target is sent', () => {

            beforeAll(() => {
                loggerConfig = new LoggerConfig();
                loggerConfig.consoleTarget = new ConsoleLoggerTargetConfig([]);
                setupMocks();

                loggerFactoryService = new LoggerFactoryService(loggerConfigReader, undefined);
                loggerService = loggerFactoryService.createLogger(new TestSource());
            });

            test('then the logger is created', () => {
                expect(loggerService).not
                    .toBeNull();
            });

            test('then the configuration reader is called', () => {
                expect(loggerConfigReader.loadLoggerConfiguration)
                    .toHaveBeenCalled();
            });

            test('then the logger service source is "TestSource"', () => {
                expect(loggerService.source)
                    .toBe('TestSource');
            });

            test('then factory contains 1 targets', () => {
                expect(loggerFactoryService.loggerTargets.length)
                    .toBe(1);
            });

            test('then the factory contains a console target', () => {
                expect(loggerFactoryService.loggerTargets
                        .findIndex((e: any) => e instanceof LoggerConsoleTargetService))
                    .toBeGreaterThan(-1);
            });

            test('then the factory does not contain a web target', () => {
                expect(loggerFactoryService.loggerTargets
                        .findIndex((e: any) => e instanceof LoggerWebTargetService))
                    .toBe(-1);
            });
        });

        describe('when a request to create a logger with web target is sent', () => {

            beforeAll(() => {
                loggerConfig = new LoggerConfig();
                loggerConfig.webTarget = new WebLoggerTargetConfig([], '', '');
                setupMocks();

                loggerFactoryService = new LoggerFactoryService(loggerConfigReader, undefined);
                loggerService = loggerFactoryService.createLogger(new TestSource());
            });

            test('then the logger is created', () => {
                expect(loggerService).not
                    .toBeNull();
            });

            test('then the configuration reader is called', () => {
                expect(loggerConfigReader.loadLoggerConfiguration)
                    .toHaveBeenCalled();
            });

            test('then the logger service source is "TestSource"', () => {
                expect(loggerService.source)
                    .toBe('TestSource');
            });

            test('then factory contains 1 targets', () => {
                expect(loggerFactoryService.loggerTargets.length)
                    .toBe(1);
            });

            test('then the factory does not contain a console target', () => {
                expect(loggerFactoryService.loggerTargets
                        .findIndex((e: any) => e instanceof LoggerConsoleTargetService))
                    .toBe(-1);
            });

            test('then the factory contains a web target', () => {
                expect(loggerFactoryService.loggerTargets
                        .findIndex((e: any) => e instanceof LoggerWebTargetService))
                    .toBeGreaterThan(-1);
            });
        });
    });
});
