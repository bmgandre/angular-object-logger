import { LogFilter } from '../../filter/log-filter';
import { WebLoggerTargetConfig } from './web-logger-target-config';
import { Injectable } from '@angular/core';
import { FilterParser } from '../../config/filter/filter-parser';

@Injectable()
export class WebTargetParser {
    constructor(
        private readonly filterParser: FilterParser
    ) {}

    parse(obj: any, globalFilters: Array<LogFilter>): WebLoggerTargetConfig {
        let rules = (obj.filters)
            ? this.filterParser.parse(obj.filters)
            : Array<LogFilter>();

        if (globalFilters) {
            rules = rules.concat(globalFilters);
        }

        const targetConfig = new WebLoggerTargetConfig(rules, obj.endpoint, obj.secret);

        return targetConfig;
    }
}
