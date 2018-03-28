import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { LogEntry } from './log-entry.model';
import { LogLevel } from './log-level.model';
import { WebLoggerTargetConfig } from './logger-target-config.model';
import { LoggerTargetService } from './logger-target-service.model';

@Injectable()
export class LoggerWebTargetService extends LoggerTargetService {

    constructor(
        @Optional() private targetConfig: WebLoggerTargetConfig,
        private http: HttpClient
    ) {
        super(targetConfig);
    }

    protected writeLog(entry: LogEntry): void {
        if (this.targetConfig.endpoint) {
            const headers = new HttpHeaders()
                .append('Content-Type', 'application/json');

            if (this.targetConfig.secret) {
                headers.append('Authorization', this.targetConfig.secret);
            }

            this.http
                .post(this.targetConfig.endpoint, entry, { headers })
                .subscribe();
        }
    }
}
