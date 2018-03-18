import { Injectable, Inject, Optional } from '@angular/core';
import { LoggerTargetConfig } from './logger-target-config.model';
import { LogEntry } from './log-entry.model';
import { LogLevel } from './log-level.model';

export abstract class LoggerTargetService {

    public constructor(
        @Optional() private config: LoggerTargetConfig
    ) { }

    public log(entry: LogEntry): void {
        if (this.config) {
            for (const filter of this.config.filters) {
                if (filter.IsMatch(entry.logger, LogLevel[entry.level])) {
                    this.writeLog(entry);
                    break;
                }
            }
        } else {
            this.writeLog(entry);
        }
    }

    protected abstract writeLog(entry: LogEntry): void;
}
