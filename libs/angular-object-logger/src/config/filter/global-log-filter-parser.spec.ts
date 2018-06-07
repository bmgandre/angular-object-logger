import { GlobalLogFilterParser } from './global-log-filter-parser';
import { FilterParser } from './filter-parser';
import { LogFilter } from '../../filter/log-filter';

describe('Parse global filters', () => {

    let globalLogFilterParser: GlobalLogFilterParser;
    let filterParser: FilterParser;
    let mockFilterParser: jest.Mock<FilterParser>;
    let mockLogFilter: jest.Mock<LogFilter>;

    function setupMocks(): void {
        mockLogFilter = jest.fn<LogFilter>();
        mockFilterParser = jest.fn<FilterParser>(() => ({
            parse: jest.fn((obj: any) => obj.map((e: any) => new mockLogFilter()))
        }));
    }

    describe('given a configuration containing global filters', () => {

        describe('when the parser is called with 2 global filters', () => {

            const environment = [
                {}, {}
            ];
            let filters: Array<LogFilter>;

            beforeAll(() => {
                setupMocks();
                filterParser = new mockFilterParser();
                globalLogFilterParser = new GlobalLogFilterParser(filterParser);
                filters = globalLogFilterParser.parse(environment);
            });

            test('then the filter object should be created', () => {
                expect(filters).not
                    .toBeNull();
            });

            test('then the filters should contain 2 items', () => {
                expect(filters.length)
                    .toBe(2);
            });
        });
    });

    describe('given a configuration containing global filters', () => {

        describe('when the parser is called with 3 global filters', () => {

            const environment = [
                {}, {}, {}
            ];
            let filters: Array<LogFilter>;

            beforeAll(() => {
                setupMocks();
                filterParser = new mockFilterParser();
                globalLogFilterParser = new GlobalLogFilterParser(filterParser);
                filters = globalLogFilterParser.parse(environment);
            });

            test('then the filter object should be created', () => {
                expect(filters).not
                    .toBeNull();
            });

            test('then the filters should contain 3 items', () => {
                expect(filters.length)
                    .toBe(3);
            });
        });
    });
});
