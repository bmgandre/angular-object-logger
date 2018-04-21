import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { LogEntry } from '../log-entry.model';
import { LogLevel } from '../log-level.model';
import { WebLoggerTargetConfig } from '../config/logger-target-config';
import { LoggerTargetService } from './logger-target-service';

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
            let headers = new HttpHeaders()
                .append('Content-Type', 'application/json');

            if (this.targetConfig.secret) {
                headers = headers.append('Authorization', this.targetConfig.secret);
            }

            this.http
                .post(this.targetConfig.endpoint, entry, { headers })
                .subscribe();
        }
    }
}
