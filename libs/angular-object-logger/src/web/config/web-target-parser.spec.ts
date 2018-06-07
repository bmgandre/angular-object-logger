import { LogFilter } from '../../filter/log-filter';
import { FilterParser } from '../../config/filter/filter-parser';
import { WebLoggerTargetConfig } from './web-logger-target-config';
import { WebTargetParser } from './web-target-parser';

describe('Parse web target configuration', () => {

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

    describe('given a configuration containing a web target with 2 filter and undefined global filter', () => {
        beforeAll(() => {
            logFilterList = [
                new mockLogFilter(),
                new mockLogFilter()
            ];
        });

        describe('when the web configuration is parsed', () => {

            let webTargetConfig: WebLoggerTargetConfig;

            beforeAll(() => {
                const webLoggerTargetParser = new WebTargetParser(filterParser);
                const config = {
                    filters: {}
                };

                webTargetConfig = webLoggerTargetParser.parse(config, undefined);
            });

            test('then the web target configuration object is created', () => {
                expect(webTargetConfig).not
                    .toBeNull();
            });

            test('then the web contains two filters', () => {
                expect(webTargetConfig.filters)
                    .toHaveLength(2);
            });
        });
    });

    describe('given a configuration containing a web target with 3 filter and no global filters', () => {
        beforeAll(() => {
            logFilterList = [
                new mockLogFilter(),
                new mockLogFilter(),
                new mockLogFilter()
            ];
            globalLogFilterList = [];
        });

        describe('when the web configuration is parsed', () => {

            let webTargetConfig: WebLoggerTargetConfig;

            beforeAll(() => {
                const webLoggerTargetParser = new WebTargetParser(filterParser);
                const config = {
                    filters: {}
                };

                webTargetConfig = webLoggerTargetParser.parse(config, globalLogFilterList);
            });

            test('then the web target configuration object is created', () => {
                expect(webTargetConfig).not
                    .toBeNull();
            });

            test('then the web contains 3 filters', () => {
                expect(webTargetConfig.filters)
                    .toHaveLength(3);
            });
        });
    });

    describe('given a configuration containing a web target with 3 filter and 4 global filters', () => {
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

        describe('when the web configuration is parsed', () => {

            let webTargetConfig: WebLoggerTargetConfig;

            beforeAll(() => {
                const webLoggerTargetParser = new WebTargetParser(filterParser);
                const config = {
                    filters: {}
                };

                webTargetConfig = webLoggerTargetParser.parse(config, globalLogFilterList);
            });

            test('then the web target configuration object is created', () => {
                expect(webTargetConfig).not
                    .toBeNull();
            });

            test('then the web contains 7 filters', () => {
                expect(webTargetConfig.filters)
                    .toHaveLength(7);
            });
        });
    });
});
