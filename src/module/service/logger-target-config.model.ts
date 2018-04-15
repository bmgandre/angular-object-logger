import { LogFilter } from './filter/log-filter';

export class LoggerConfig {
    filters?: Array<LogFilter> = [];
    consoleTarget?: ConsoleLoggerTargetConfig;
    webTarget?: WebLoggerTargetConfig;
}

export class LoggerTargetConfig {
    filters?: Array<LogFilter> = [];
}

export class ConsoleLoggerTargetConfig extends LoggerTargetConfig {
}

export class WebLoggerTargetConfig extends LoggerTargetConfig {
    endpoint: string;
    secret?: string;
}
