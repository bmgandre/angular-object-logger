import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerConfig } from '../config/logger-config';
import { LoggerConsoleTargetService } from '../target/logger-console-target.service';
import { LoggerService } from '../logger.service';
import { LoggerTargetService } from '../target/logger-target-service';
import { LoggerWebTargetService } from '../target/logger-web-target.service';
import { LoggerConfigReader } from './logger-config-reader';

@Injectable()
export class LoggerFactoryService {
    private loggerConfig: LoggerConfig;
    private loggerTargets: Array<LoggerTargetService> = [];

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
