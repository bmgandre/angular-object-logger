import { LoggerFactoryService } from './logger-factory.service';
import { LogLevel } from '../log-level.model';
import { MinMaxLevelLogFilter } from '../filter/min-max-level-log-filter';
import { SourceParser } from './source-parser';

export class MinMaxLevelLogFilterParser {
    static parse(obj: any): MinMaxLevelLogFilter {
        const minlevel = obj.minlevel
            ? LogLevel[obj.minlevel.toLowerCase() as keyof typeof LogLevel]
            : LogLevel.trace;

        const maxlevel = obj.maxlevel
            ? LogLevel[obj.maxlevel.toLowerCase() as keyof typeof LogLevel]
            : LogLevel.fatal;

        const source = SourceParser.sourceOrDefaultSource(obj.source);

        return new MinMaxLevelLogFilter(source, minlevel, maxlevel);
    }
}
