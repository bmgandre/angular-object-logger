import { LogLevel } from './log-level.model';

export class LogSource {
    method?: string;
    path?: string;
    line?: number;
    pos?: number;
    file?: string;
    stack?: string;
}

export interface LogEntry {
    level: string;
    timestamp: Date;
    logger: string;
    source?: LogSource;
}

export class TraceLogEntry implements LogEntry {
    level: string = LogLevel[LogLevel.trace];
    timestamp: Date = new Date();
    source?: LogSource;

    constructor(
        readonly logger: string
    ) {}
}

export class DebugLogEntry implements LogEntry {
    level: string = LogLevel[LogLevel.debug];
    timestamp: Date = new Date();
    source?: LogSource;

    constructor(
        readonly logger: string
    ) {}
}

export class InfoLogEntry implements LogEntry {
    level: string = LogLevel[LogLevel.info];
    timestamp: Date = new Date();
    source?: LogSource;

    constructor(
        readonly logger: string
    ) {}
}

export class WarnLogEntry implements LogEntry {
    level: string = LogLevel[LogLevel.warn];
    timestamp: Date = new Date();
    source?: LogSource;

    constructor(
        readonly logger: string
    ) {}
}

export class ErrorLogEntry implements LogEntry {
    level: string = LogLevel[LogLevel.error];
    timestamp: Date = new Date();
    source?: LogSource;

    constructor(
        readonly logger: string
    ) {}
}

export class FatalLogEntry implements LogEntry {
    level: string = LogLevel[LogLevel.fatal];
    timestamp: Date = new Date();
    source?: LogSource;

    constructor(
        readonly logger: string
    ) {}
}

export class InvalidLogEntryError extends Error {
    constructor(message: string) {
        super(message);
    }
}
