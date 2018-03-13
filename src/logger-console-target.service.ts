import { Injectable, Inject, Optional } from '@angular/core';
import { LoggerTargetService } from './logger-target-service.model';
import { ConsoleLoggerTargetConfig } from './logger-target-config.model';
import { LogEntry } from './log-entry.model';
import { LogLevel } from './log-level.model';

@Injectable()
export class LoggerConsoleTargetService extends LoggerTargetService {

    public constructor(
        @Optional() config: ConsoleLoggerTargetConfig
    ) {
        super(config);
    }

    protected writeLog(entry: LogEntry): void {
        switch (LogLevel[entry.level]) {
            case LogLevel.trace:
            case LogLevel.debug:
            case LogLevel.info:
                console.log(entry);
                break;
            case LogLevel.warn:
                console.warn(entry);
                break;
            case LogLevel.error:
            case LogLevel.fatal:
                console.error(entry);
                break;
        }
    }
}
