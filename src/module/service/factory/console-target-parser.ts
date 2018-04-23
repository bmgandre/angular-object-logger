import { ConsoleLoggerTargetConfig } from '../config/console-logger-target-config';
import { LogFilter } from '../filter/log-filter';
import { FilterParser } from './filter-parser';
import { Injectable } from '@angular/core';

@Injectable()
export class ConsoleTargetParser {
    constructor(
        private readonly filterParser: FilterParser
    ) {}

    parse(obj: any, globalFilters: Array<LogFilter>): ConsoleLoggerTargetConfig {
        const consoleTargetConfig = new ConsoleLoggerTargetConfig();

        if (obj.filters) {
            const rules = this.filterParser.parse(obj.filters);
            consoleTargetConfig.filters = rules;
        }

        consoleTargetConfig.filters = consoleTargetConfig.filters.concat(globalFilters);

        return consoleTargetConfig;
    }
}
