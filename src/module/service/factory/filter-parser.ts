import { FixedLevelLogFilterParser } from './fixed-level-log-filter-parser';
import { LogFilter } from '../filter/log-filter';
import { MinMaxLevelLogFilterParser } from './min-max-level-log-filter-parser';
import { MultiLevelLogFilterParser } from './multi-level-log-filter-parser';

export class FilterParser {

    static parse(obj: any): Array<LogFilter> {
        const filters: Array<LogFilter> = [];
        obj.forEach((element: any) => {
            const rule = FilterParser.parseRule(element);
            if (rule) {
                filters.push(rule);
            }
        });

        return filters;
    }

    private static parseRule(obj: any): LogFilter | undefined {
        if (obj.minlevel || obj.maxlevel) {
            return MinMaxLevelLogFilterParser.parse(obj);
        } else if (obj.level) {
            return FixedLevelLogFilterParser.parse(obj);
        } else if (obj.levels) {
            return MultiLevelLogFilterParser.parse(obj);
        }

        return undefined;
    }
}
