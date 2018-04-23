import { LoggerConfig } from '../config/logger-config';
import { LogFilter } from '../filter/log-filter';
import { GlobalLogFilterParser } from './global-log-filter-parser';
import { ConsoleTargetParser } from './console-target-parser';
import { WebTargetParser } from './web-target-parser';
import { LoggerEnvironmentConfig } from './logger-environment-config';
import { Injectable } from '@angular/core';

@Injectable()
export class LoggerConfigReader {

    constructor(
        private readonly config: LoggerEnvironmentConfig,
        private readonly globalLogFilterParser: GlobalLogFilterParser,
        private readonly consoleTargetParser: ConsoleTargetParser,
        private readonly webTargetParser: WebTargetParser
    ) {}

    loadLoggerConfiguration(): LoggerConfig {
        const loggerConfig = new LoggerConfig();
        let globalFilters: Array<LogFilter> = [];

        if (this.config.logger) {
            if (this.config.logger.filters) {
                globalFilters = this.globalLogFilterParser.parse(this.config.logger.filters);
            }

            if (this.config.logger.consoleTarget) {
                loggerConfig.consoleTarget = this.consoleTargetParser.parse(this.config.logger.consoleTarget, globalFilters);
            }

            if (this.config.logger.webTarget) {
                loggerConfig.webTarget = this.webTargetParser.parse(this.config.logger.webTarget, globalFilters);
            }
        }

        return loggerConfig;
    }
}
