import { LoggerEnvironmentConfig } from './logger-environment-config';
import { GlobalLogFilterParser } from './filter/global-log-filter-parser';
import { ConsoleTargetParser } from '../console/config/console-target-parser';
import { WebTargetParser } from '../web/config/web-target-parser';
import { LoggerConfigReader } from './logger-config-reader';
import { LoggerConfig } from './logger-config';

describe('Read configurations from environment object', () => {
    let mockGlobalLogFilterParser: jest.Mock<GlobalLogFilterParser>;
    let globalLogFilterParser: GlobalLogFilterParser;

    let mockConsoleTargetParser: jest.Mock<ConsoleTargetParser>;
    let consoleTargetParser: ConsoleTargetParser;

    let mockWebTargetParser: jest.Mock<WebTargetParser>;
    let webTargetParser: WebTargetParser;

    function setupParserMocks(): void {
        mockGlobalLogFilterParser = jest.fn<GlobalLogFilterParser>(() => ({
            parse: jest.fn()
        }));

        mockConsoleTargetParser = jest.fn<ConsoleTargetParser>(() => ({
            parse: jest.fn()
        }));

        mockWebTargetParser = jest.fn<WebTargetParser>(() => ({
            parse: jest.fn()
        }));

        globalLogFilterParser = new mockGlobalLogFilterParser();
        consoleTargetParser = new mockConsoleTargetParser();
        webTargetParser = new mockWebTargetParser();
    }

    describe('given a configuration containing global filters', () => {
        describe('when the reader is called', () => {

            let loggerConfigReader: LoggerConfigReader;
            let loggerConfig: LoggerConfig;
            const environment = {
                logger: {
                    filters: {}
                }
            };

            beforeAll(() => {
                setupParserMocks();

                loggerConfigReader = new LoggerConfigReader(environment,
                    globalLogFilterParser,
                    consoleTargetParser,
                    webTargetParser);

                loggerConfig = loggerConfigReader.loadLoggerConfiguration();
            });

            test('then the logger configuration object is created', () => {
                expect(loggerConfig).not
                    .toBeNull();
            });

            test('then the global log filter parser should be called', () => {
                expect(globalLogFilterParser.parse)
                    .toHaveBeenCalled();
            });
        });
    });

    describe('given a configuration containing global filters and a console target', () => {
        describe('when the reader is called', () => {

            let loggerConfigReader: LoggerConfigReader;
            let loggerConfig: LoggerConfig;
            const environment = {
                logger: {
                    filters: {},
                    consoleTarget: {}
                }
            };

            beforeAll(() => {
                setupParserMocks();

                loggerConfigReader = new LoggerConfigReader(environment,
                    globalLogFilterParser,
                    consoleTargetParser,
                    webTargetParser);

                loggerConfig = loggerConfigReader.loadLoggerConfiguration();
            });

            test('then the logger configuration object is created', () => {
                expect(loggerConfig).not
                    .toBeNull();
            });

            test('then the global log filter parser should be called', () => {
                expect(globalLogFilterParser.parse)
                    .toHaveBeenCalled();
            });

            test('then the console target parser should be called', () => {
                expect(consoleTargetParser.parse)
                    .toHaveBeenCalled();
            });
        });
    });

    describe('given a configuration containing global filters and a web target', () => {
        describe('when the reader is called', () => {

            let loggerConfigReader: LoggerConfigReader;
            let loggerConfig: LoggerConfig;
            const environment = {
                logger: {
                    filters: {},
                    webTarget: {}
                }
            };

            beforeAll(() => {
                setupParserMocks();

                loggerConfigReader = new LoggerConfigReader(environment,
                    globalLogFilterParser,
                    consoleTargetParser,
                    webTargetParser);

                loggerConfig = loggerConfigReader.loadLoggerConfiguration();
            });

            test('then the logger configuration object is created', () => {
                expect(loggerConfig).not
                    .toBeNull();
            });

            test('then the global log filter parser should be called', () => {
                expect(globalLogFilterParser.parse)
                    .toHaveBeenCalled();
            });

            test('then the web target parser should be called', () => {
                expect(webTargetParser.parse)
                    .toHaveBeenCalled();
            });
        });
    });

    describe('given a configuration containing console and web target', () => {
        describe('when the reader is called', () => {

            let loggerConfigReader: LoggerConfigReader;
            let loggerConfig: LoggerConfig;
            const environment = {
                logger: {
                    webTarget: {},
                    consoleTarget: {}
                }
            };

            beforeAll(() => {
                setupParserMocks();

                loggerConfigReader = new LoggerConfigReader(environment,
                    globalLogFilterParser,
                    consoleTargetParser,
                    webTargetParser);

                loggerConfig = loggerConfigReader.loadLoggerConfiguration();
            });

            test('then the logger configuration object is created', () => {
                expect(loggerConfig).not
                    .toBeNull();
            });

            test('then the console target parser should be called', () => {
                expect(consoleTargetParser.parse)
                    .toHaveBeenCalled();
            });

            test('then the web target parser should be called', () => {
                expect(webTargetParser.parse)
                    .toHaveBeenCalled();
            });
        });
    });
});
