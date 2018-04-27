import { LogLevel } from '../log-level.model';
import { MinMaxLevelLogFilter } from './min-max-level-log-filter';

describe('Filter logs with minimal and maximal values', () => {

    describe(`given minimal level is ${LogLevel[LogLevel.trace]} and maximal level is ${LogLevel[LogLevel.fatal]}`, () => {
        const logFilter = new MinMaxLevelLogFilter('.*', LogLevel.trace, LogLevel.fatal);
        describe('when log is received', () => {
            test(`then ${LogLevel[LogLevel.trace]} is accepted`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.trace))
                    .toBeTruthy();
            });
            test(`then ${LogLevel[LogLevel.debug]} is accepted`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.debug))
                    .toBeTruthy();
            });
            test(`then ${LogLevel[LogLevel.info]} is accepted`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.info))
                    .toBeTruthy();
            });
            test(`then ${LogLevel[LogLevel.warn]} is accepted`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.warn))
                    .toBeTruthy();
            });
            test(`then ${LogLevel[LogLevel.error]} is accepted`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.error))
                    .toBeTruthy();
            });
            test(`then ${LogLevel[LogLevel.fatal]} is accepted`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.fatal))
                    .toBeTruthy();
            });
        });
    });

    describe(`given minimal level is ${LogLevel[LogLevel.debug]} and maximal level is ${LogLevel[LogLevel.fatal]}`, () => {
        const logFilter = new MinMaxLevelLogFilter('.*', LogLevel.debug, LogLevel.fatal);
        describe('when log is received', () => {
            test(`then ${LogLevel[LogLevel.trace]} is rejected`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.trace))
                    .toBeFalsy();
            });
            test(`then ${LogLevel[LogLevel.debug]} is accepted`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.debug))
                    .toBeTruthy();
            });
            test(`then ${LogLevel[LogLevel.info]} is accepted`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.info))
                    .toBeTruthy();
            });
            test(`then ${LogLevel[LogLevel.warn]} is accepted`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.warn))
                    .toBeTruthy();
            });
            test(`then ${LogLevel[LogLevel.error]} is accepted`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.error))
                    .toBeTruthy();
            });
            test(`then ${LogLevel[LogLevel.fatal]} is accepted`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.fatal))
                    .toBeTruthy();
            });
        });
    });

    describe(`given minimal level is ${LogLevel[LogLevel.info]} and maximal level is ${LogLevel[LogLevel.fatal]}`, () => {
        const logFilter = new MinMaxLevelLogFilter('.*', LogLevel.info, LogLevel.fatal);
        describe('when log is received', () => {
            test(`then ${LogLevel[LogLevel.trace]} is rejected`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.trace))
                    .toBeFalsy();
            });
            test(`then ${LogLevel[LogLevel.debug]} is rejected`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.debug))
                    .toBeFalsy();
            });
            test(`then ${LogLevel[LogLevel.info]} is accepted`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.info))
                    .toBeTruthy();
            });
            test(`then ${LogLevel[LogLevel.warn]} is accepted`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.warn))
                    .toBeTruthy();
            });
            test(`then ${LogLevel[LogLevel.error]} is accepted`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.error))
                    .toBeTruthy();
            });
            test(`then ${LogLevel[LogLevel.fatal]} is accepted`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.fatal))
                    .toBeTruthy();
            });
        });
    });

    describe(`given minimal level is ${LogLevel[LogLevel.warn]} and maximal level is ${LogLevel[LogLevel.fatal]}`, () => {
        const logFilter = new MinMaxLevelLogFilter('.*', LogLevel.warn, LogLevel.fatal);
        describe('when log is received', () => {
            test(`then ${LogLevel[LogLevel.trace]} is rejected`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.trace))
                    .toBeFalsy();
            });
            test(`then ${LogLevel[LogLevel.debug]} is rejected`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.debug))
                    .toBeFalsy();
            });
            test(`then ${LogLevel[LogLevel.info]} is rejected`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.info))
                    .toBeFalsy();
            });
            test(`then ${LogLevel[LogLevel.warn]} is accepted`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.warn))
                    .toBeTruthy();
            });
            test(`then ${LogLevel[LogLevel.error]} is accepted`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.error))
                    .toBeTruthy();
            });
            test(`then ${LogLevel[LogLevel.fatal]} is accepted`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.fatal))
                    .toBeTruthy();
            });
        });
    });

    describe(`given minimal level is ${LogLevel[LogLevel.error]} and maximal level is ${LogLevel[LogLevel.fatal]}`, () => {
        const logFilter = new MinMaxLevelLogFilter('.*', LogLevel.error, LogLevel.fatal);
        describe('when log is received', () => {
            test(`then ${LogLevel[LogLevel.trace]} is rejected`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.trace))
                    .toBeFalsy();
            });
            test(`then ${LogLevel[LogLevel.debug]} is rejected`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.debug))
                    .toBeFalsy();
            });
            test(`then ${LogLevel[LogLevel.info]} is rejected`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.info))
                    .toBeFalsy();
            });
            test(`then ${LogLevel[LogLevel.warn]} is rejected`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.warn))
                    .toBeFalsy();
            });
            test(`then ${LogLevel[LogLevel.error]} is accepted`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.error))
                    .toBeTruthy();
            });
            test(`then ${LogLevel[LogLevel.fatal]} is accepted`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.fatal))
                    .toBeTruthy();
            });
        });
    });

    describe(`given minimal level is ${LogLevel[LogLevel.fatal]} and maximal level is ${LogLevel[LogLevel.fatal]}`, () => {
        const logFilter = new MinMaxLevelLogFilter('.*', LogLevel.fatal, LogLevel.fatal);
        describe('when log is received', () => {
            test(`then ${LogLevel[LogLevel.trace]} is rejected`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.trace))
                    .toBeFalsy();
            });
            test(`then ${LogLevel[LogLevel.debug]} is rejected`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.debug))
                    .toBeFalsy();
            });
            test(`then ${LogLevel[LogLevel.info]} is rejected`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.info))
                    .toBeFalsy();
            });
            test(`then ${LogLevel[LogLevel.warn]} is rejected`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.warn))
                    .toBeFalsy();
            });
            test(`then ${LogLevel[LogLevel.error]} is rejected`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.error))
                    .toBeFalsy();
            });
            test(`then ${LogLevel[LogLevel.fatal]} is accepted`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.fatal))
                    .toBeTruthy();
            });
        });
    });

    describe(`given minimal level is ${LogLevel[LogLevel.fatal]} and maximal level is ${LogLevel[LogLevel.error]}`, () => {
        const logFilter = new MinMaxLevelLogFilter('.*', LogLevel.fatal, LogLevel.error);
        describe('when log is received', () => {
            test(`then ${LogLevel[LogLevel.trace]} is rejected`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.trace))
                    .toBeFalsy();
            });
            test(`then ${LogLevel[LogLevel.debug]} is rejected`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.debug))
                    .toBeFalsy();
            });
            test(`then ${LogLevel[LogLevel.info]} is rejected`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.info))
                    .toBeFalsy();
            });
            test(`then ${LogLevel[LogLevel.warn]} is rejected`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.warn))
                    .toBeFalsy();
            });
            test(`then ${LogLevel[LogLevel.error]} is rejected`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.error))
                    .toBeFalsy();
            });
            test(`then ${LogLevel[LogLevel.fatal]} is rejected`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.fatal))
                    .toBeFalsy();
            });
        });
    });

    describe('given the log filter source is HomeComponent', () => {
        const level = LogLevel.debug;
        const source = 'HomeComponent';
        const logFilter = new MinMaxLevelLogFilter(source);

        describe('when a log is received', () => {
            test(`then ${source} source is accepted`, () => {
                expect(logFilter.IsMatch(source, level))
                    .toBeTruthy();
            });
            test(`then ${'AppComponent'} source is rejected`, () => {
                expect(logFilter.IsMatch('AppComponent', level))
                    .toBeFalsy();
            });
            test(`then ${'LoggerService'} source is rejected`, () => {
                expect(logFilter.IsMatch('LoggerService', level))
                    .toBeFalsy();
            });

            test(`then ${'Home'} source is rejected`, () => {
                expect(logFilter.IsMatch('Home', level))
                    .toBeFalsy();
            });

            test(`then ${'Component'} source is rejected`, () => {
                expect(logFilter.IsMatch('Component', level))
                    .toBeFalsy();
            });
        });
    });

    describe('given the log filter source is .*Component', () => {
        const level = LogLevel.error;
        const source = '.*Component';
        const logFilter = new MinMaxLevelLogFilter(source);

        describe('when a log is received', () => {
            test(`then ${'AppComponent'} source is accepted`, () => {
                expect(logFilter.IsMatch('AppComponent', level))
                    .toBeTruthy();
            });
            test(`then ${'LoggerService'} source is rejected`, () => {
                expect(logFilter.IsMatch('LoggerService', level))
                    .toBeFalsy();
            });

            test(`then ${'Home'} source is rejected`, () => {
                expect(logFilter.IsMatch('Home', level))
                    .toBeFalsy();
            });

            test(`then ${'Component'} source is accepted`, () => {
                expect(logFilter.IsMatch('Component', level))
                    .toBeTruthy();
            });
        });
    });

    describe('given the log filter source is Home.*', () => {
        const level = LogLevel.error;
        const source = 'Home.*';
        const logFilter = new MinMaxLevelLogFilter(source);

        describe('when a log is received', () => {
            test(`then ${'AppComponent'} source is rejected`, () => {
                expect(logFilter.IsMatch('AppComponent', level))
                    .toBeFalsy();
            });
            test(`then ${'LoggerService'} source is rejected`, () => {
                expect(logFilter.IsMatch('LoggerService', level))
                    .toBeFalsy();
            });

            test(`then ${'Home'} source is accepted`, () => {
                expect(logFilter.IsMatch('Home', level))
                    .toBeTruthy();
            });

            test(`then ${'Home'}Component source is accepted`, () => {
                expect(logFilter.IsMatch('HomeComponent', level))
                    .toBeTruthy();
            });

            test(`then ${'Component'} source is rejected`, () => {
                expect(logFilter.IsMatch('Component', level))
                    .toBeFalsy();
            });
        });
    });
});
