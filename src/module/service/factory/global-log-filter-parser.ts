import { LogFilter } from '../filter/log-filter';
import { FilterParser } from './filter-parser';

export class GlobalLogFilterParser {
    static parse(obj: any): Array<LogFilter> {
        return FilterParser.parse(obj);
    }
}
