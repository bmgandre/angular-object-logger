import { FixedLevelLogFilter } from '../filter/fixed-level-log-filter';
import { LogLevel } from '../log-level.model';
import { SourceParser } from './source-parser';
import { Injectable } from '@angular/core';

@Injectable()
export class FixedLevelLogFilterParser {
    parse(obj: any): FixedLevelLogFilter {
        const level = obj.level
            ? LogLevel[obj.level as keyof typeof LogLevel]
            : LogLevel.trace;

        const source = SourceParser.sourceOrDefaultSource(obj.source);

        return new FixedLevelLogFilter(source, level);
    }
}
