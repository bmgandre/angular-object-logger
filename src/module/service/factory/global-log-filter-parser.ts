import { LogFilter } from '../filter/log-filter';
import { FilterParser } from './filter-parser';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalLogFilterParser {

    constructor(
        private readonly filterParser: FilterParser
    ) {}

    parse(obj: any): Array<LogFilter> {
        return this.filterParser.parse(obj);
    }
}
