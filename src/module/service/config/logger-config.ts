import { ConsoleLoggerTargetConfig } from '../console/config/console-logger-target-config';
import { LogFilter } from '../filter/log-filter';
import { WebLoggerTargetConfig } from '../web/config/web-logger-target-config';

export class LoggerConfig {
    filters?: Array<LogFilter> = [];
    consoleTarget?: ConsoleLoggerTargetConfig;
    webTarget?: WebLoggerTargetConfig;
}
