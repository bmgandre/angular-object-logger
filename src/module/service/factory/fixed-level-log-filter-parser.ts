import { FixedLevelLogFilter } from '../filter/fixed-level-log-filter';
import { LogLevel } from '../log-level.model';
import { SourceParser } from './source-parser';

export class FixedLevelLogFilterParser {
    static  parse(obj: any): FixedLevelLogFilter {
        const level = obj.level
            ? LogLevel[obj.level as keyof typeof LogLevel]
            : LogLevel.trace;

        const source = SourceParser.sourceOrDefaultSource(obj.source);

        return new FixedLevelLogFilter(source, level);
    }
}
