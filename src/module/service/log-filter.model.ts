import { LogLevel } from './log-level.model';

export abstract class LogFilter {
    private source: string;
    private regexp: RegExp;

    public constructor(source: string) {
        this.source = source;
        this.regexp = new RegExp(source);
    }

    protected IsSourceMatch(term: string): boolean {
        return this.regexp.test(term);
    }

    protected abstract IsLevelMatch(level: LogLevel): boolean;

    public IsMatch(source: string, level: LogLevel): boolean {
        return this.IsSourceMatch(source) && this.IsLevelMatch(level);
    }
}

export class MinMaxLevelLogFilter extends LogFilter {
    public constructor(
        source: string,
        private minlevel: LogLevel = LogLevel.trace,
        private maxlevel: LogLevel = LogLevel.fatal
    ) {
        super(source);
    }

    public IsLevelMatch(level: LogLevel): boolean {
        return this.minlevel <= level && level <= this.maxlevel;
    }
}

export class FixedLevelLogFilter extends LogFilter {
    public constructor(
        source: string,
        private level: LogLevel
    ) {
        super(source);
    }

    public IsLevelMatch(level: LogLevel): boolean {
        return this.level === level;
    }
}

export class MultiLevelLogFilter extends LogFilter {
    public constructor(
        source: string,
        private levels: LogLevel[]
    ) {
        super(source);
    }

    public IsLevelMatch(level: LogLevel): boolean {
        return this.levels.indexOf(level) > 0;
    }
}
