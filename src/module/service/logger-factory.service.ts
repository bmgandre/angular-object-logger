import { ConsoleLoggerTargetConfig, LoggerConfig, WebLoggerTargetConfig } from './config/logger-target-config.model';
import { FixedLevelLogFilter } from './filter/fixed-level-log-filter';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { LogFilter } from './filter/log-filter';
import { LoggerConsoleTargetService } from './target/logger-console-target.service';
import { LoggerService } from './logger.service';
import { LoggerTargetService } from './target/logger-target-service';
import { LoggerWebTargetService } from './target/logger-web-target.service';
import { LogLevel } from './log-level.model';
import { MinMaxLevelLogFilter } from './filter/min-max-level-log-filter';
import { MultiLevelLogFilter } from './filter/multi-level-log-filter';

export class LoggerFactoryConfig {
    [key: string]: any;
}

@Injectable()
export class LoggerFactoryService {
    private loggerConfig: LoggerConfig;
    private loggerTargets: Array<LoggerTargetService> = [];

    private static sourceOrDefaultSource(obj: any): string {
        const source = obj ? obj as string : '.*';

        return source;
    }

    private static parseGlobalFilters(obj: any): Array<LogFilter> {
        return LoggerFactoryService.parseRuleSet(obj);
    }

    private static parseConsoleTarget(obj: any, globalFilters: Array<LogFilter>): ConsoleLoggerTargetConfig {
        const consoleTargetConfig = new ConsoleLoggerTargetConfig();

        if (obj.filters) {
            const rules = LoggerFactoryService.parseRuleSet(obj.filters);
            consoleTargetConfig.filters = rules;
        }

        consoleTargetConfig.filters = consoleTargetConfig.filters.concat(globalFilters);

        return consoleTargetConfig;
    }

    private static parseWebTarget(obj: any, globalFilters: Array<LogFilter>): WebLoggerTargetConfig {
        const webLoggerTargetConfig = new WebLoggerTargetConfig();

        if (obj.filters) {
            const rules = LoggerFactoryService.parseRuleSet(obj.filters);
            webLoggerTargetConfig.filters = rules;
        }

        webLoggerTargetConfig.filters = webLoggerTargetConfig.filters.concat(globalFilters);

        if (obj.endpoint) {
            webLoggerTargetConfig.endpoint = obj.endpoint;
        }

        if (obj.secret) {
            webLoggerTargetConfig.secret = obj.secret;
        }

        return webLoggerTargetConfig;
    }

    private static parseRuleSet(obj: any): Array<LogFilter> {
        const filters: Array<LogFilter> = [];
        obj.forEach((element: any) => {
            const rule = LoggerFactoryService.parseRule(element);
            if (rule) {
                filters.push(rule);
            }
        });

        return filters;
    }

    private static parseRule(obj: any): LogFilter | undefined {
        if (obj.minlevel || obj.maxlevel) {
            return LoggerFactoryService.parseMinMaxRule(obj);
        } else if (obj.level) {
            return LoggerFactoryService.parseFixedRule(obj);
        } else if (obj.levels) {
            return LoggerFactoryService.parseMultiLevelRule(obj);
        }

        return undefined;
    }

    private static parseMinMaxRule(obj: any): MinMaxLevelLogFilter {
        const minlevel = obj.minlevel
            ? LogLevel[obj.minlevel.toLowerCase() as keyof typeof LogLevel]
            : LogLevel.trace;

        const maxlevel = obj.maxlevel
            ? LogLevel[obj.maxlevel.toLowerCase() as keyof typeof LogLevel]
            : LogLevel.fatal;

        const source = LoggerFactoryService.sourceOrDefaultSource(obj.source);

        return new MinMaxLevelLogFilter(source, minlevel, maxlevel);
    }

    private static  parseFixedRule(obj: any): FixedLevelLogFilter {
        const level = obj.level
            ? LogLevel[obj.level as keyof typeof LogLevel]
            : LogLevel.trace;

        const source = LoggerFactoryService.sourceOrDefaultSource(obj.source);

        return new FixedLevelLogFilter(source, level);
    }

    private static parseMultiLevelRule(obj: any): MultiLevelLogFilter {
        const source = LoggerFactoryService.sourceOrDefaultSource(obj.source);
        let levels: Array<LogLevel> = [];

        if (obj.levels) {
            obj.levels.forEach((element: any) => {
                levels.push(LogLevel[element as keyof typeof LogLevel]);
            });
        } else {
            levels = [
                LogLevel.trace,
                LogLevel.debug,
                LogLevel.info,
                LogLevel.warn,
                LogLevel.error,
                LogLevel.fatal
            ];
        }

        return new MultiLevelLogFilter(source, levels);
    }

    constructor(
        private config: LoggerFactoryConfig,
        private http: HttpClient
    ) {
        this.loadTargetsFromEnvironment();
    }

    createLogger<T>(obj: T): LoggerService {
        const logger = new LoggerService(this.loggerTargets);
        logger.source = obj.constructor.name;

        return logger;
    }

    private loadTargetsFromEnvironment(): void {
        this.loggerConfig = this.parseEnvironment();
        if (this.loggerConfig.consoleTarget) {
            this.loggerTargets.push(new LoggerConsoleTargetService(this.loggerConfig.consoleTarget));
        }

        if (this.loggerConfig.webTarget) {
            this.loggerTargets.push(new LoggerWebTargetService(this.loggerConfig.webTarget, this.http));
        }
    }

    private parseEnvironment(): LoggerConfig {
        const loggerConfig = new LoggerConfig();
        let globalFilters: Array<LogFilter> = [];

        if (this.config.logger) {
            if (this.config.logger.filters) {
                globalFilters = LoggerFactoryService.parseGlobalFilters(this.config.logger.filters);
            }

            if (this.config.logger.consoleTarget) {
                loggerConfig.consoleTarget = LoggerFactoryService.parseConsoleTarget(this.config.logger.consoleTarget, globalFilters);
            }

            if (this.config.logger.webTarget) {
                loggerConfig.webTarget = LoggerFactoryService.parseWebTarget(this.config.logger.webTarget, globalFilters);
            }
        }

        return loggerConfig;
    }
}
