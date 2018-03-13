import { Injectable, Inject, Optional } from '@angular/core';
import { LoggerTargetService  } from './logger-target-service.model';
import { LoggerService } from './logger.service';
import {
    LoggerConfig,
    ConsoleLoggerTargetConfig,
    WebLoggerTargetConfig
} from './logger-target-config.model';
import {
    MinMaxLevelLogFilter,
    FixedLevelLogFilter,
    MultiLevelLogFilter,
    LogFilter
} from './log-filter.model';
import { LogLevel } from './log-level.model';
import { LoggerConsoleTargetService } from './logger-console-target.service';
import { LoggerWebTargetService } from './logger-web-target.service';
import { HttpClient } from '@angular/common/http';

export class LoggerFactoryConfig {
    [key: string]: any;
}

@Injectable()
export class LoggerFactoryService {
    private loggerConfig: LoggerConfig;
    private loggerTargets: LoggerTargetService[] = [];

    public constructor(
        private config: LoggerFactoryConfig,
        private http: HttpClient
    ) {
        this.loadTargetsFromEnvironment();
    }

    public createLogger<T>(obj: T): LoggerService {
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
        let globalFilters: LogFilter[] = [];

        if (this.config.logger) {
            if (this.config.logger.filters) {
                globalFilters = this.parseGlobalFilters(this.config.logger.filters);
            }

            if (this.config.logger.consoleTarget) {
                loggerConfig.consoleTarget = this.parseConsoleTarget(this.config.logger.consoleTarget, globalFilters);
            }

            if (this.config.logger.webTarget) {
                loggerConfig.webTarget = this.parseWebTarget(this.config.logger.webTarget, globalFilters);
            }
        }

        return loggerConfig;
    }

    private parseGlobalFilters(obj: any): LogFilter[] {
        return this.parseRuleSet(obj);
    }

    private parseConsoleTarget(obj: any, globalFilters: LogFilter[]): ConsoleLoggerTargetConfig {
        const consoleTargetConfig = new ConsoleLoggerTargetConfig();

        if (obj.filters) {
            const rules = this.parseRuleSet(obj.filters);
            consoleTargetConfig.filters = rules;
        }

        consoleTargetConfig.filters = consoleTargetConfig.filters.concat(globalFilters);
        return consoleTargetConfig;
    }

    private parseWebTarget(obj: any, globalFilters: LogFilter[]): WebLoggerTargetConfig {
        const webLoggerTargetConfig = new WebLoggerTargetConfig();

        if (obj.filters) {
            const rules = this.parseRuleSet(obj.filters);
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

    private parseRuleSet(obj: any): LogFilter[] {
        const filters: LogFilter[] = [];
        obj.forEach((element: any) => {
            const rule = this.parseRule(element);
            if (rule) {
                filters.push(rule);
            }
        });

        return filters;
    }

    private parseRule(obj: any): LogFilter | null {
        if (obj.minlevel || obj.maxlevel) {
            return this.parseMinMaxRule(obj);
        } else if (obj.level) {
            return this.parseFixedRule(obj);
        } else if (obj.lovels) {
            return this.parseMultiLevelRule(obj);
        }

        return null;
    }

    private parseMinMaxRule(obj: any): MinMaxLevelLogFilter {
        const minlevel = obj.minlevel
            ? LogLevel[obj.minlevel.toLowerCase() as string]
            : LogLevel.trace;

        const maxlevel = obj.maxlevel
            ? LogLevel[obj.maxlevel.toLowerCase() as string]
            : LogLevel.fatal;

        const source = this.sourceOrDefaultSource(obj.source);
        return new MinMaxLevelLogFilter(source, minlevel, maxlevel);
    }

    private parseFixedRule(obj: any): FixedLevelLogFilter {
        const level = obj.level
            ? LogLevel[obj.level as string]
            : LogLevel.trace;

        const source = this.sourceOrDefaultSource(obj.source);
        return new FixedLevelLogFilter(source, level);
    }

    private parseMultiLevelRule(obj: any): MultiLevelLogFilter {
        const source = this.sourceOrDefaultSource(obj.source);
        let levels: LogLevel[] = [];

        if (obj.levels) {
            obj.levels.forEach((element: any) => {
                levels.push(LogLevel[element as string]);
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

    private sourceOrDefaultSource(obj: any): string {
        const source = obj ? obj as string : '.*';
        return source;
    }
}
