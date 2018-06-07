import { FixedLevelLogFilterParser } from './fixed-level-log-filter-parser';
import { LogLevel } from '../../log-level.model';
import { FixedLevelLogFilter } from '../../filter/fixed-level-log-filter';

describe('Parse fixed level filters', () => {

    describe('given a configuration containing a fixed level filter', () => {

        describe('when the parser is called with a trace level', () => {

            let fixedLevelLogFilterParser: FixedLevelLogFilterParser;
            let filter: FixedLevelLogFilter;
            const environment = {
                level: 'trace'
            };

            beforeAll(() => {
                fixedLevelLogFilterParser = new FixedLevelLogFilterParser();
                filter = fixedLevelLogFilterParser.parse(environment);
            });

            test('then the filter should be created', () => {
                expect(filter).not
                    .toBeNull();
            });

            test('then the filter loglevel should be trace', () => {
                expect(filter.IsLevelMatch(LogLevel.trace))
                    .toBeTruthy();
            });

            test('then the source should be .*', () => {
                expect(filter.source)
                    .toBe('.*');
            });
        });

        describe('when the parser is called with a debug level and HomeComponent Source', () => {

            let fixedLevelLogFilterParser: FixedLevelLogFilterParser;
            let filter: FixedLevelLogFilter;
            const environment = {
                level: 'debug',
                source: 'HomeComponent'
            };

            beforeAll(() => {
                fixedLevelLogFilterParser = new FixedLevelLogFilterParser();
                filter = fixedLevelLogFilterParser.parse(environment);
            });

            test('then the filter should be created', () => {
                expect(filter).not
                    .toBeNull();
            });

            test('then the filter loglevel should be debug', () => {
                expect(filter.IsLevelMatch(LogLevel.debug))
                    .toBeTruthy();
            });

            test('then the source should be HomeComponent', () => {
                expect(filter.source)
                    .toBe('HomeComponent');
            });
        });

        describe('when the parser is called with a info level and HomeComponent Source', () => {

            let fixedLevelLogFilterParser: FixedLevelLogFilterParser;
            let filter: FixedLevelLogFilter;
            const environment = {
                level: 'info',
                source: 'HomeComponent'
            };

            beforeAll(() => {
                fixedLevelLogFilterParser = new FixedLevelLogFilterParser();
                filter = fixedLevelLogFilterParser.parse(environment);
            });

            test('then the filter should be created', () => {
                expect(filter).not
                    .toBeNull();
            });

            test('then the filter loglevel should be info', () => {
                expect(filter.IsLevelMatch(LogLevel.info))
                    .toBeTruthy();
            });

            test('then the source should be HomeComponent', () => {
                expect(filter.source)
                    .toBe('HomeComponent');
            });
        });

        describe('when the parser is called with a warn level', () => {

            let fixedLevelLogFilterParser: FixedLevelLogFilterParser;
            let filter: FixedLevelLogFilter;
            const environment = {
                level: 'warn'
            };

            beforeAll(() => {
                fixedLevelLogFilterParser = new FixedLevelLogFilterParser();
                filter = fixedLevelLogFilterParser.parse(environment);
            });

            test('then the filter should be created', () => {
                expect(filter).not
                    .toBeNull();
            });

            test('then the filter loglevel should be warn', () => {
                expect(filter.IsLevelMatch(LogLevel.warn))
                    .toBeTruthy();
            });

            test('then the source should be .*', () => {
                expect(filter.source)
                    .toBe('.*');
            });
        });

        describe('when the parser is called with a error level', () => {

            let fixedLevelLogFilterParser: FixedLevelLogFilterParser;
            let filter: FixedLevelLogFilter;
            const environment = {
                level: 'error'
            };

            beforeAll(() => {
                fixedLevelLogFilterParser = new FixedLevelLogFilterParser();
                filter = fixedLevelLogFilterParser.parse(environment);
            });

            test('then the filter should be created', () => {
                expect(filter).not
                    .toBeNull();
            });

            test('then the filter loglevel should be error', () => {
                expect(filter.IsLevelMatch(LogLevel.error))
                    .toBeTruthy();
            });

            test('then the source should be .*', () => {
                expect(filter.source)
                    .toBe('.*');
            });
        });

        describe('when the parser is called with a fatal level', () => {

            let fixedLevelLogFilterParser: FixedLevelLogFilterParser;
            let filter: FixedLevelLogFilter;
            const environment = {
                level: 'fatal'
            };

            beforeAll(() => {
                fixedLevelLogFilterParser = new FixedLevelLogFilterParser();
                filter = fixedLevelLogFilterParser.parse(environment);
            });

            test('then the filter should be created', () => {
                expect(filter).not
                    .toBeNull();
            });

            test('then the filter loglevel should be fatal', () => {
                expect(filter.IsLevelMatch(LogLevel.fatal))
                    .toBeTruthy();
            });

            test('then the source should be .*', () => {
                expect(filter.source)
                    .toBe('.*');
            });
        });
    });
});
