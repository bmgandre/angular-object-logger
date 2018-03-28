import { Inject, Injectable, Optional } from '@angular/core';
import { InvalidLogEntryError, LogEntry } from './log-entry.model';
import { LogLevel } from './log-level.model';
import { ConsoleLoggerTargetConfig } from './logger-target-config.model';
import { LoggerTargetService } from './logger-target-service.model';

@Injectable()
export class LoggerConsoleTargetService extends LoggerTargetService {

    constructor(
        @Optional() config: ConsoleLoggerTargetConfig
    ) {
        super(config);
    }

    protected writeLog(entry: LogEntry): void {
        switch (LogLevel[entry.level as keyof typeof LogLevel]) {
            case LogLevel.trace:
            case LogLevel.debug:
            case LogLevel.info:
                // tslint:disable-next-line:no-console
                console.log(entry);
                break;
            case LogLevel.warn:
                // tslint:disable-next-line:no-console
                console.warn(entry);
                break;
            case LogLevel.error:
            case LogLevel.fatal:
                // tslint:disable-next-line:no-console
                console.error(entry);
                break;
            default:
                throw new InvalidLogEntryError(`${entry} is invalid`);
        }
    }
}
