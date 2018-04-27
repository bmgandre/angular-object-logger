import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerConfig } from '../config/logger-config';
import { LoggerService } from '../logger.service';
import { LoggerTargetService } from '../target/logger-target-service';
import { LoggerConfigReader } from '../config/logger-config-reader';
import { LoggerConsoleTargetService } from '../console/target/logger-console-target.service';
import { LoggerWebTargetService } from '../web/target/logger-web-target.service';

@Injectable()
export class LoggerFactoryService {
    loggerTargets: Array<LoggerTargetService> = [];
    private loggerConfig: LoggerConfig;

    constructor(
        private configReader: LoggerConfigReader,
        private http: HttpClient
    ) {
        this.buildTargetConfigurations();
    }

    createLogger<T>(obj: T): LoggerService {
        const logger = new LoggerService(this.loggerTargets);
        logger.source = obj.constructor.name;

        return logger;
    }

    private buildTargetConfigurations(): void {
        this.loggerConfig = this.configReader.loadLoggerConfiguration();
        if (this.loggerConfig.consoleTarget) {
            this.loggerTargets.push(new LoggerConsoleTargetService(this.loggerConfig.consoleTarget));
        }

        if (this.loggerConfig.webTarget) {
            this.loggerTargets.push(new LoggerWebTargetService(this.loggerConfig.webTarget, this.http));
        }
    }
}
