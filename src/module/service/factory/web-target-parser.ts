import { FilterParser } from './filter-parser';
import { LogFilter } from '../filter/log-filter';
import { WebLoggerTargetConfig } from '../config/web-logger-target-config';

export class WebTargetParser {
    static parse(obj: any, globalFilters: Array<LogFilter>): WebLoggerTargetConfig {
        const rules = (obj.filters)
            ? FilterParser.parse(obj.filters)
            : Array<LogFilter>();
        rules.concat(globalFilters);

        const targetConfig = new WebLoggerTargetConfig(rules, obj.endpoint, obj.secret);

        return targetConfig;
    }
}
