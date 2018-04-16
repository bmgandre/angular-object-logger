import { Inject, Injectable, Optional } from '@angular/core';
import { LogEntry } from '../log-entry.model';
import { LogLevel } from '../log-level.model';
import { LoggerTargetConfig } from '../config/logger-target-config.model';

export abstract class LoggerTargetService {

    constructor(
        @Optional() private config: LoggerTargetConfig
    ) { }

    log(entry: LogEntry): void {
        if (this.config) {
            for (const filter of this.config.filters) {
                if (filter.IsMatch(entry.logger, LogLevel[entry.level as keyof typeof LogLevel])) {
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
