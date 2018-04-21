import { ConsoleLoggerTargetConfig } from '../config/console-logger-target-config';
import { LogFilter } from '../filter/log-filter';
import { FilterParser } from './filter-parser';

export class ConsoleTargetParser {
    static parse(obj: any, globalFilters: Array<LogFilter>): ConsoleLoggerTargetConfig {
        const consoleTargetConfig = new ConsoleLoggerTargetConfig();

        if (obj.filters) {
            const rules = FilterParser.parse(obj.filters);
            consoleTargetConfig.filters = rules;
        }

        consoleTargetConfig.filters = consoleTargetConfig.filters.concat(globalFilters);

        return consoleTargetConfig;
    }
}
