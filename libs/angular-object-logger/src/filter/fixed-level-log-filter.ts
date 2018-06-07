import { LogFilter } from './log-filter';
import { LogLevel } from '../log-level.model';

export class FixedLevelLogFilter extends LogFilter {
    constructor(
        source: string,
        private level: LogLevel
    ) {
        super(source);
    }

    IsLevelMatch(level: LogLevel): boolean {
        return this.level === level;
    }
}
