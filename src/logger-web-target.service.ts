import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoggerTargetService } from './logger-target-service.model';
import { LogEntry } from './log-entry.model';
import { LogLevel } from './log-level.model';
import { WebLoggerTargetConfig } from './logger-target-config.model';

@Injectable()
export class LoggerWebTargetService extends LoggerTargetService {

    public constructor(
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
                .post(this.targetConfig.endpoint, entry, { headers: headers })
                .subscribe();
        }
    }
}
