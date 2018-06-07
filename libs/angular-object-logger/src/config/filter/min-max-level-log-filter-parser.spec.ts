import { MinMaxLevelLogFilterParser } from './min-max-level-log-filter-parser';
import { MinMaxLevelLogFilter } from '../../filter/min-max-level-log-filter';
import { LogLevel } from '../../log-level.model';

describe('Parse range level filters', () => {

    describe('given a configuration containing a range level filter', () => {

        describe('when the parser is called with a filter from trace to fatal', () => {

            let minMaxLevelLogFilterParser: MinMaxLevelLogFilterParser;
            let filter: MinMaxLevelLogFilter;
            const environment = {
                minlevel: 'trace',
                maxlevel: 'fatal'
            };

            beforeAll(() => {
                minMaxLevelLogFilterParser = new MinMaxLevelLogFilterParser();
                filter = minMaxLevelLogFilterParser.parse(environment);
            });

            test('then the filter should be created', () => {
                expect(filter).not
                    .toBeNull();
            });

            test('then the filter loglevel should accept from trace level', () => {
                expect(filter.IsLevelMatch(LogLevel.trace))
                    .toBeTruthy();
            });

            test('then the filter loglevel should accept from debug level', () => {
                expect(filter.IsLevelMatch(LogLevel.debug))
                    .toBeTruthy();
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

            test('then the filter loglevel should accept from fatal level', () => {
                expect(filter.IsLevelMatch(LogLevel.fatal))
                    .toBeTruthy();
            });

            test('then the source should be .*', () => {
                expect(filter.source)
                    .toBe('.*');
            });
        });

        describe('when the parser is called with a filter from info to fatal and HomeComponent source', () => {

            let minMaxLevelLogFilterParser: MinMaxLevelLogFilterParser;
            let filter: MinMaxLevelLogFilter;
            const environment = {
                minlevel: 'info',
                maxlevel: 'fatal',
                source: 'HomeComponent'
            };

            beforeAll(() => {
                minMaxLevelLogFilterParser = new MinMaxLevelLogFilterParser();
                filter = minMaxLevelLogFilterParser.parse(environment);
            });

            test('then the filter should be created', () => {
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

            test('then the filter loglevel should accept from fatal level', () => {
                expect(filter.IsLevelMatch(LogLevel.fatal))
                    .toBeTruthy();
            });

            test('then the source should be HomeComponent', () => {
                expect(filter.source)
                    .toBe('HomeComponent');
            });
        });

        describe('when the parser is called with a filter from warn to error', () => {

            let minMaxLevelLogFilterParser: MinMaxLevelLogFilterParser;
            let filter: MinMaxLevelLogFilter;
            const environment = {
                minlevel: 'warn',
                maxlevel: 'error'
            };

            beforeAll(() => {
                minMaxLevelLogFilterParser = new MinMaxLevelLogFilterParser();
                filter = minMaxLevelLogFilterParser.parse(environment);
            });

            test('then the filter should be created', () => {
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

            test('then the filter loglevel should reject from info level', () => {
                expect(filter.IsLevelMatch(LogLevel.info))
                    .toBeFalsy();
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

        describe('when the parser is called with a filter from error to error', () => {

            let minMaxLevelLogFilterParser: MinMaxLevelLogFilterParser;
            let filter: MinMaxLevelLogFilter;
            const environment = {
                minlevel: 'error',
                maxlevel: 'error'
            };

            beforeAll(() => {
                minMaxLevelLogFilterParser = new MinMaxLevelLogFilterParser();
                filter = minMaxLevelLogFilterParser.parse(environment);
            });

            test('then the filter should be created', () => {
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
});
