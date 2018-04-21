import { LogFilter } from '../filter/log-filter';

export class LoggerConfig {
    filters?: Array<LogFilter> = [];
    consoleTarget?: ConsoleLoggerTargetConfig;
    webTarget?: WebLoggerTargetConfig;
}

export class LoggerTargetConfig {
    constructor(
        public filters: Array<LogFilter> = []
    ) {}
}

export class ConsoleLoggerTargetConfig extends LoggerTargetConfig {
    constructor(
        filters: Array<LogFilter> = []
    ) {
        super(filters);
    }
}

export class WebLoggerTargetConfig extends LoggerTargetConfig {
    constructor(
        filters: Array<LogFilter> = [],
        public endpoint: string,
        public secret: string
    ) {
        super(filters);
    }
}
