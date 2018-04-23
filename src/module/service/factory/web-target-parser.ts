import { FilterParser } from './filter-parser';
import { LogFilter } from '../filter/log-filter';
import { WebLoggerTargetConfig } from '../config/web-logger-target-config';
import { Injectable } from '@angular/core';

@Injectable()
export class WebTargetParser {
    constructor(
        private readonly filterParser: FilterParser
    ) {}

    parse(obj: any, globalFilters: Array<LogFilter>): WebLoggerTargetConfig {
        const rules = (obj.filters)
            ? this.filterParser.parse(obj.filters)
            : Array<LogFilter>();
        rules.concat(globalFilters);

        const targetConfig = new WebLoggerTargetConfig(rules, obj.endpoint, obj.secret);

        return targetConfig;
    }
}
