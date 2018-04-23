import { LogLevel } from '../../log-level.model';
import { MultiLevelLogFilter } from '../../filter/multi-level-log-filter';
import { SourceParser } from './source-parser';
import { Injectable } from '@angular/core';

@Injectable()
export class MultiLevelLogFilterParser {
    parse(obj: any): MultiLevelLogFilter {
        const source = SourceParser.sourceOrDefaultSource(obj.source);
        let levels: Array<LogLevel> = [];

        if (obj.levels) {
            obj.levels.forEach((element: any) => {
                levels.push(LogLevel[element as keyof typeof LogLevel]);
            });
        } else {
            levels = [
                LogLevel.trace,
                LogLevel.debug,
                LogLevel.info,
                LogLevel.warn,
                LogLevel.error,
                LogLevel.fatal
            ];
        }

        return new MultiLevelLogFilter(source, levels);
    }
}
