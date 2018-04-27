import { LogFilter } from './log-filter';
import { LogLevel } from '../log-level.model';

export class MultiLevelLogFilter extends LogFilter {
    constructor(
        source: string,
        private levels: Array<LogLevel>
    ) {
        super(source);
    }

    IsLevelMatch(level: LogLevel): boolean {
        return this.levels.indexOf(level) >= 0;
    }
}
