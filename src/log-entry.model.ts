import { LogLevel } from './log-level.model';

export class LogSource {
    public method?: string;
    public path?: string;
    public line?: number;
    public pos?: number;
    public file?: string;
    public stack?: string;
}

export class LogEntry {
    level: string;
    timestamp: Date;
    logger: string;
    source?: LogSource;
}

export class TraceLogEntry implements LogEntry {
    level: string = LogLevel[LogLevel.trace];
    timestamp: Date = new Date();
    source?: LogSource;

    public constructor(
        public logger: string
    ) { }
}

export class DebugLogEntry implements LogEntry {
    level: string = LogLevel[LogLevel.debug];
    timestamp: Date = new Date();
    source?: LogSource;

    public constructor(
        public logger: string
    ) { }
}

export class InfoLogEntry implements LogEntry {
    level: string = LogLevel[LogLevel.info];
    timestamp: Date = new Date();
    source?: LogSource;

    public constructor(
        public logger: string
    ) { }
}

export class WarnLogEntry implements LogEntry {
    level: string = LogLevel[LogLevel.warn];
    timestamp: Date = new Date();
    source?: LogSource;

    public constructor(
        public logger: string
    ) { }
}

export class ErrorLogEntry implements LogEntry {
    level: string = LogLevel[LogLevel.error];
    timestamp: Date = new Date();
    source?: LogSource;

    public constructor(
        public logger: string
    ) { }
}

export class FatalLogEntry implements LogEntry {
    level: string = LogLevel[LogLevel.fatal];
    timestamp: Date = new Date();
    source?: LogSource;

    public constructor(
        public logger: string
    ) { }
}
