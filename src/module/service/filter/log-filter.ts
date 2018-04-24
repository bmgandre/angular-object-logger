import { LogLevel } from '../log-level.model';

export abstract class LogFilter {
    source: string;
    private regexp: RegExp;

    constructor(source: string) {
        this.source = source;
        this.regexp = new RegExp(source);
    }

    IsMatch(source: string, level: LogLevel): boolean {
        return this.IsSourceMatch(source) && this.IsLevelMatch(level);
    }

    protected IsSourceMatch(term: string): boolean {
        return this.regexp.test(term);
    }

    protected abstract IsLevelMatch(level: LogLevel): boolean;
}
