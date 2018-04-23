import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { LoggerTargetService } from '../../target/logger-target-service';
import { WebLoggerTargetConfig } from '../config/web-logger-target-config';
import { LogEntry } from '../../log-entry.model';

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
