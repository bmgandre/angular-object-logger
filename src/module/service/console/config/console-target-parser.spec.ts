import { ConsoleLoggerTargetConfig } from './console-logger-target-config';
import { FilterParser } from '../../config/filter/filter-parser';
import { LogFilter } from '../../filter/log-filter';
import { ConsoleTargetParser } from './console-target-parser';

describe('Parse console target configuration', () => {

    let mockLogFilter: jest.Mock<LogFilter>;
    let logFilterList: Array<LogFilter>;
    let globalLogFilterList: Array<LogFilter>;
    let mockFilterParser: jest.Mock<FilterParser>;
    let filterParser: FilterParser;

    beforeAll(() => {
        mockLogFilter = jest.fn<LogFilter>();
        mockFilterParser = jest.fn<FilterParser>(() => ({
            parse: jest.fn((obj: any): Array<LogFilter> => {
                return logFilterList;
            })
        }));
        filterParser = new mockFilterParser();
    });

    describe('given a configuration containing a console target with 2 filters and undefined global filter', () => {

        beforeAll(() => {
            logFilterList = [
                new mockLogFilter(),
                new mockLogFilter()
            ];
        });

        describe('when the console configuration is parsed', () => {

            let consoleTargetConfig: ConsoleLoggerTargetConfig;

            beforeAll(() => {
                const consoleLoggerTargetParser = new ConsoleTargetParser(filterParser);
                const config = {
                    filters: {}
                };
                consoleTargetConfig = consoleLoggerTargetParser.parse(config, undefined);
            });

            test('then the console target configuration object is created', () => {
                expect(consoleTargetConfig).not
                    .toBeNull();
            });

            test('then the console contains two filters', () => {
                expect(consoleTargetConfig.filters)
                    .toHaveLength(2);
            });
        });
    });

    describe('given a configuration containing a console target with 3 filters and no global filters', () => {

        beforeAll(() => {
            logFilterList = [
                new mockLogFilter(),
                new mockLogFilter(),
                new mockLogFilter()
            ];
            globalLogFilterList = [];
        });

        describe('when the console configuration is parsed', () => {

            let consoleTargetConfig: ConsoleLoggerTargetConfig;

            beforeAll(() => {
                const consoleLoggerTargetParser = new ConsoleTargetParser(filterParser);
                const config = {
                    filters: {}
                };
                consoleTargetConfig = consoleLoggerTargetParser.parse(config, globalLogFilterList);
            });

            test('then the console target configuration object is created', () => {
                expect(consoleTargetConfig).not
                    .toBeNull();
            });

            test('then the console contains two filters', () => {
                expect(consoleTargetConfig.filters)
                    .toHaveLength(3);
            });
        });
    });

    describe('given a configuration containing a console target with 3 filters and 4 global filters', () => {

        beforeAll(() => {
            logFilterList = [
                new mockLogFilter(),
                new mockLogFilter(),
                new mockLogFilter()
            ];
            globalLogFilterList = [
                new mockLogFilter(),
                new mockLogFilter(),
                new mockLogFilter(),
                new mockLogFilter()
            ];
        });

        describe('when the console configuration is parsed', () => {

            let consoleTargetConfig: ConsoleLoggerTargetConfig;

            beforeAll(() => {
                const consoleLoggerTargetParser = new ConsoleTargetParser(filterParser);
                const config = {
                    filters: {}
                };
                consoleTargetConfig = consoleLoggerTargetParser.parse(config, globalLogFilterList);
            });

            test('then the console target configuration object is created', () => {
                expect(consoleTargetConfig).not
                    .toBeNull();
            });

            test('then the console contains two filters', () => {
                expect(consoleTargetConfig.filters)
                    .toHaveLength(7);
            });
        });
    });
});
