import { MinMaxLevelLogFilterParser } from './min-max-level-log-filter-parser';
import { FixedLevelLogFilterParser } from './fixed-level-log-filter-parser';
import { MultiLevelLogFilterParser } from './multi-level-log-filter-parser';
import { FilterParser } from './filter-parser';
import { LogFilter } from '../../filter/log-filter';

describe('Parse filters from environment object', () => {

    let mockMinMaxLevelLogFilterParser: jest.Mock<MinMaxLevelLogFilterParser>;
    let minMaxLevelLogFilterParser: MinMaxLevelLogFilterParser;

    let mockFixedLevelLogFilterParser: jest.Mock<FixedLevelLogFilterParser>;
    let fixedLevelLogFilterParser: FixedLevelLogFilterParser;

    let mockMultiLevelLogFilterParser: jest.Mock<MultiLevelLogFilterParser>;
    let multiLevelLogFilterParser: MultiLevelLogFilterParser;

    function mockParsers(): void {
        const mockLogFilter = jest.fn<LogFilter>();

        mockMinMaxLevelLogFilterParser = jest.fn<MinMaxLevelLogFilterParser>(() => ({
            parse: jest.fn((obj: any) => new mockLogFilter())
        }));

        mockFixedLevelLogFilterParser = jest.fn<FixedLevelLogFilterParser>(() => ({
            parse: jest.fn((obj: any) => new mockLogFilter())
        }));

        mockMultiLevelLogFilterParser = jest.fn<MultiLevelLogFilterParser>(() => ({
            parse: jest.fn((obj: any) => new mockLogFilter())
        }));

        minMaxLevelLogFilterParser = new mockMinMaxLevelLogFilterParser();
        fixedLevelLogFilterParser = new mockFixedLevelLogFilterParser();
        multiLevelLogFilterParser = new mockMultiLevelLogFilterParser();
    }

    describe('given a configuration containing a range filter', () => {
        describe('when the parser is called', () => {

            let filterParser: FilterParser;
            const environment = [
                {
                    minlevel: {},
                    maxlevel: {}
                },
                {
                    other: {}
                }
            ];

            let logFilters: Array<LogFilter>;

            beforeAll(() => {
                mockParsers();
                filterParser = new FilterParser(minMaxLevelLogFilterParser,
                    fixedLevelLogFilterParser,
                    multiLevelLogFilterParser);

                logFilters = filterParser.parse(environment);
            });

            test('then the filter list is created', () => {
                expect(logFilters).not
                    .toBeNull();
            });

            test('then the range parser should be called', () => {
                expect(minMaxLevelLogFilterParser.parse)
                    .toHaveBeenCalled();
            });

            test('then the fixed level parser should not be called', () => {
                expect(fixedLevelLogFilterParser.parse).not
                    .toHaveBeenCalled();
            });

            test('then the multi level parser should not be called', () => {
                expect(multiLevelLogFilterParser.parse).not
                    .toHaveBeenCalled();
            });

            test('then the number of filters should be 1', () => {
                expect(logFilters.length)
                    .toBe(1);
            });
        });
    });

    describe('given a configuration containing a fixed level filter', () => {
        describe('when the parser is called', () => {

            let filterParser: FilterParser;
            const environment = [
                {
                    level: {}
                },
                {
                    other: {}
                }
            ];

            let logFilters: Array<LogFilter>;

            beforeAll(() => {
                mockParsers();
                filterParser = new FilterParser(minMaxLevelLogFilterParser,
                    fixedLevelLogFilterParser,
                    multiLevelLogFilterParser);

                logFilters = filterParser.parse(environment);
            });

            test('then the filter list is created', () => {
                expect(logFilters).not
                    .toBeNull();
            });

            test('then the range parser should not be called', () => {
                expect(minMaxLevelLogFilterParser.parse).not
                    .toHaveBeenCalled();
            });

            test('then the fixed level parser should be called', () => {
                expect(fixedLevelLogFilterParser.parse)
                    .toHaveBeenCalled();
            });

            test('then the multi level parser should not be called', () => {
                expect(multiLevelLogFilterParser.parse).not
                    .toHaveBeenCalled();
            });

            test('then the number of filters should be 1', () => {
                expect(logFilters.length)
                    .toBe(1);
            });
        });
    });

    describe('given a configuration containing a multi level filter', () => {
        describe('when the parser is called', () => {

            let filterParser: FilterParser;
            const environment = [
                {
                    levels: {}
                },
                {
                    other: {}
                }
            ];

            let logFilters: Array<LogFilter>;

            beforeAll(() => {
                mockParsers();
                filterParser = new FilterParser(minMaxLevelLogFilterParser,
                    fixedLevelLogFilterParser,
                    multiLevelLogFilterParser);

                logFilters = filterParser.parse(environment);
            });

            test('then the filter list is created', () => {
                expect(logFilters).not
                    .toBeNull();
            });

            test('then the range parser should not be called', () => {
                expect(minMaxLevelLogFilterParser.parse).not
                    .toHaveBeenCalled();
            });

            test('then the fixed level parser should not be called', () => {
                expect(fixedLevelLogFilterParser.parse).not
                    .toHaveBeenCalled();
            });

            test('then the multi level parser should be called', () => {
                expect(multiLevelLogFilterParser.parse)
                    .toHaveBeenCalled();
            });

            test('then the number of filters should be 1', () => {
                expect(logFilters.length)
                    .toBe(1);
            });
        });
    });
});
