import { LogFilter } from './log-filter';
import { LogLevel } from '../log-level.model';

export class MinMaxLevelLogFilter extends LogFilter {
    constructor(
        source: string,
        private minlevel: LogLevel = LogLevel.trace,
        private maxlevel: LogLevel = LogLevel.fatal
    ) {
        super(source);
    }

    IsLevelMatch(level: LogLevel): boolean {
        return this.minlevel <= level && level <= this.maxlevel;
    }
}
