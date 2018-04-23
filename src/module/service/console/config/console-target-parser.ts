import { ConsoleLoggerTargetConfig } from './console-logger-target-config';
import { LogFilter } from '../../filter/log-filter';
import { Injectable } from '@angular/core';
import { FilterParser } from '../../config/filter/filter-parser';

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

        if (globalFilters) {
            consoleTargetConfig.filters = consoleTargetConfig.filters.concat(globalFilters);
        }

        return consoleTargetConfig;
    }
}
