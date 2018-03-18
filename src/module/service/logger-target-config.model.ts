import {
    LogFilter,
    MinMaxLevelLogFilter
} from './log-filter.model';

export class LoggerConfig {
    public filters?: LogFilter[] = [];
    public consoleTarget?: ConsoleLoggerTargetConfig;
    public webTarget?: WebLoggerTargetConfig;
}

export class LoggerTargetConfig {
    public filters?: LogFilter[] = [];
}

export class ConsoleLoggerTargetConfig extends LoggerTargetConfig {
}

export class WebLoggerTargetConfig extends LoggerTargetConfig {
    public endpoint: string;
    public secret?: string;
}
