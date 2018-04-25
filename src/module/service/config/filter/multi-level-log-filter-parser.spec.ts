import { MultiLevelLogFilterParser } from './multi-level-log-filter-parser';
import { MultiLevelLogFilter } from '../../filter/multi-level-log-filter';
import { LogLevel } from '../../log-level.model';

describe('Parse multi-level filters', () => {

    describe('given a configuration containing [ info, warn, error ] filters', () => {

        let multiLevelLogFilterParser: MultiLevelLogFilterParser;
        let filter: MultiLevelLogFilter;
        const environment = {
            levels: [ 'info', 'warn', 'error' ]
        };

        beforeAll(() => {
            multiLevelLogFilterParser = new MultiLevelLogFilterParser();
            filter = multiLevelLogFilterParser.parse(environment);
        });

        test('then the filter should be crated', () => {
            expect(filter).not
                .toBeNull();
        });

        test('then the filter loglevel should reject from trace level', () => {
            expect(filter.IsLevelMatch(LogLevel.trace))
                .toBeFalsy();
        });

        test('then the filter loglevel should reject from debug level', () => {
            expect(filter.IsLevelMatch(LogLevel.debug))
                .toBeFalsy();
        });

        test('then the filter loglevel should accept from info level', () => {
            expect(filter.IsLevelMatch(LogLevel.info))
                .toBeTruthy();
        });

        test('then the filter loglevel should accept from warn level', () => {
            expect(filter.IsLevelMatch(LogLevel.warn))
                .toBeTruthy();
        });

        test('then the filter loglevel should accept from error level', () => {
            expect(filter.IsLevelMatch(LogLevel.error))
                .toBeTruthy();
        });

        test('then the filter loglevel should reject from fatal level', () => {
            expect(filter.IsLevelMatch(LogLevel.fatal))
                .toBeFalsy();
        });

        test('then the source should be .*', () => {
            expect(filter.source)
                .toBe('.*');
        });
    });

    describe('given a configuration containing [ trace, fatal, error ] filters and HomeComponent source', () => {

        let multiLevelLogFilterParser: MultiLevelLogFilterParser;
        let filter: MultiLevelLogFilter;
        const environment = {
            levels: [ 'trace', 'fatal', 'error' ],
            source: 'HomeComponent'
        };

        beforeAll(() => {
            multiLevelLogFilterParser = new MultiLevelLogFilterParser();
            filter = multiLevelLogFilterParser.parse(environment);
        });

        test('then the filter should be crated', () => {
            expect(filter).not
                .toBeNull();
        });

        test('then the filter loglevel should accept from trace level', () => {
            expect(filter.IsLevelMatch(LogLevel.trace))
                .toBeTruthy();
        });

        test('then the filter loglevel should reject from debug level', () => {
            expect(filter.IsLevelMatch(LogLevel.debug))
                .toBeFalsy();
        });

        test('then the filter loglevel should reject from info level', () => {
            expect(filter.IsLevelMatch(LogLevel.info))
                .toBeFalsy();
        });

        test('then the filter loglevel should reject from warn level', () => {
            expect(filter.IsLevelMatch(LogLevel.warn))
                .toBeFalsy();
        });

        test('then the filter loglevel should accept from error level', () => {
            expect(filter.IsLevelMatch(LogLevel.error))
                .toBeTruthy();
        });

        test('then the filter loglevel should accept from fatal level', () => {
            expect(filter.IsLevelMatch(LogLevel.fatal))
                .toBeTruthy();
        });

        test('then the source should be HomeComponent', () => {
            expect(filter.source)
                .toBe('HomeComponent');
        });
    });

    describe('given a configuration containing [ debug ] filters', () => {

        let multiLevelLogFilterParser: MultiLevelLogFilterParser;
        let filter: MultiLevelLogFilter;
        const environment = {
            levels: [ 'debug' ]
        };

        beforeAll(() => {
            multiLevelLogFilterParser = new MultiLevelLogFilterParser();
            filter = multiLevelLogFilterParser.parse(environment);
        });

        test('then the filter should be crated', () => {
            expect(filter).not
                .toBeNull();
        });

        test('then the filter loglevel should reject from trace level', () => {
            expect(filter.IsLevelMatch(LogLevel.trace))
                .toBeFalsy();
        });

        test('then the filter loglevel should accept from debug level', () => {
            expect(filter.IsLevelMatch(LogLevel.debug))
                .toBeTruthy();
        });

        test('then the filter loglevel should reject from info level', () => {
            expect(filter.IsLevelMatch(LogLevel.info))
                .toBeFalsy();
        });

        test('then the filter loglevel should reject from warn level', () => {
            expect(filter.IsLevelMatch(LogLevel.warn))
                .toBeFalsy();
        });

        test('then the filter loglevel should reject from error level', () => {
            expect(filter.IsLevelMatch(LogLevel.error))
                .toBeFalsy();
        });

        test('then the filter loglevel should reject from fatal level', () => {
            expect(filter.IsLevelMatch(LogLevel.fatal))
                .toBeFalsy();
        });

        test('then the source should be .*', () => {
            expect(filter.source)
                .toBe('.*');
        });
    });
});
