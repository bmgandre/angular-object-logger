import { FixedLevelLogFilterParser } from './fixed-level-log-filter-parser';
import { LogFilter } from '../filter/log-filter';
import { MinMaxLevelLogFilterParser } from './min-max-level-log-filter-parser';
import { MultiLevelLogFilterParser } from './multi-level-log-filter-parser';
import { Injectable } from '@angular/core';

@Injectable()
export class FilterParser {

    constructor(
        private readonly minMaxLevelLogFilterParser: MinMaxLevelLogFilterParser,
        private readonly fixedLevelLogFilterParser: FixedLevelLogFilterParser,
        private readonly multiLevelLogFilterParser: MultiLevelLogFilterParser
    ) {}

    parse(obj: any): Array<LogFilter> {
        const filters: Array<LogFilter> = [];
        obj.forEach((element: any) => {
            const rule = this.parseRule(element);
            if (rule) {
                filters.push(rule);
            }
        });

        return filters;
    }

    private parseRule(obj: any): LogFilter | undefined {
        if (obj.minlevel || obj.maxlevel) {
            return this.minMaxLevelLogFilterParser.parse(obj);
        } else if (obj.level) {
            return this.fixedLevelLogFilterParser.parse(obj);
        } else if (obj.levels) {
            return this.multiLevelLogFilterParser.parse(obj);
        }

        return undefined;
    }
}
