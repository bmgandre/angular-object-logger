import { LogFilter } from './log-filter';
import { LogLevel } from '../log-level.model';
import { MultiLevelLogFilter } from './multi-level-log-filter';

describe('Filter logs with multiple level filter', () => {

    describe(`given the log filter contains ${LogLevel[LogLevel.trace]}, ${LogLevel[LogLevel.warn]}, ${LogLevel[LogLevel.error]}`, () => {
        const logFilter = new MultiLevelLogFilter('.*', [ LogLevel.trace, LogLevel.warn, LogLevel.error ]);

        describe('when a log is received', () => {

            test(`then ${LogLevel[LogLevel.trace]} is accepted`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.trace))
                    .toBeTruthy();
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
            test(`then ${LogLevel[LogLevel.fatal]} is rejected`, () => {
                expect(logFilter.IsLevelMatch(LogLevel.fatal))
                    .toBeFalsy();
            });
        });
    });

    describe(`given the log filter contains ${LogLevel[LogLevel.warn]}, ${LogLevel[LogLevel.error]}, ${LogLevel[LogLevel.fatal]}`, () => {
        const logFilter = new MultiLevelLogFilter('.*', [ LogLevel.warn, LogLevel.error, LogLevel.fatal ]);

        describe('when a log is received', () => {

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

    describe(`given the log filter contains ${LogLevel[LogLevel.debug]}, ${LogLevel[LogLevel.info]}, ${LogLevel[LogLevel.fatal]}`, () => {
        const logFilter = new MultiLevelLogFilter('.*', [ LogLevel.debug, LogLevel.info, LogLevel.fatal ]);

        describe('when a log is received', () => {

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

    describe(`given the log filter contains ${LogLevel[LogLevel.fatal]}`, () => {
        const logFilter = new MultiLevelLogFilter('.*', [ LogLevel.fatal ]);

        describe('when a log is received', () => {

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

    describe('given the log filter contains no level', () => {
        const logFilter = new MultiLevelLogFilter('.*', [ ]);

        describe('when a log is received', () => {

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
        const logFilter = new MultiLevelLogFilter(source, [ level ]);

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
        const logFilter = new MultiLevelLogFilter(source, [ level ]);

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
        const logFilter = new MultiLevelLogFilter(source, [ level ]);

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
