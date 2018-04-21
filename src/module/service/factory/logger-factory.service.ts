import { ConsoleLoggerTargetConfig } from '../config/console-logger-target-config';
import { FixedLevelLogFilter } from '../filter/fixed-level-log-filter';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { LogFilter } from '../filter/log-filter';
import { LoggerConfig } from '../config/logger-config';
import { LoggerConsoleTargetService } from '../target/logger-console-target.service';
import { LoggerService } from '../logger.service';
import { LoggerTargetService } from '../target/logger-target-service';
import { LoggerWebTargetService } from '../target/logger-web-target.service';
import { LogLevel } from '../log-level.model';
import { MinMaxLevelLogFilter } from '../filter/min-max-level-log-filter';
import { MultiLevelLogFilter } from '../filter/multi-level-log-filter';
import { WebLoggerTargetConfig } from '../config/web-logger-target-config';
import { GlobalLogFilterParser } from './global-log-filter-parser';
import { ConsoleTargetParser } from './console-target-parser';
import { WebTargetParser } from './web-target-parser';

export class LoggerFactoryConfig {
    [key: string]: any;
}

@Injectable()
export class LoggerFactoryService {
    private loggerConfig: LoggerConfig;
    private loggerTargets: Array<LoggerTargetService> = [];

    constructor(
        private config: LoggerFactoryConfig,
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
        this.loggerConfig = this.loadLoggerConfiguration();
        if (this.loggerConfig.consoleTarget) {
            this.loggerTargets.push(new LoggerConsoleTargetService(this.loggerConfig.consoleTarget));
        }

        if (this.loggerConfig.webTarget) {
            this.loggerTargets.push(new LoggerWebTargetService(this.loggerConfig.webTarget, this.http));
        }
    }

    private loadLoggerConfiguration(): LoggerConfig {
        const loggerConfig = new LoggerConfig();
        let globalFilters: Array<LogFilter> = [];

        if (this.config.logger) {
            if (this.config.logger.filters) {
                globalFilters = GlobalLogFilterParser.parse(this.config.logger.filters);
            }

            if (this.config.logger.consoleTarget) {
                loggerConfig.consoleTarget = ConsoleTargetParser.parse(this.config.logger.consoleTarget, globalFilters);
            }

            if (this.config.logger.webTarget) {
                loggerConfig.webTarget = WebTargetParser.parse(this.config.logger.webTarget, globalFilters);
            }
        }

        return loggerConfig;
    }
}
