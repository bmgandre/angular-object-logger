import { LogFilter } from '../filter/log-filter';
import { LoggerTargetConfig } from './logger-target-config';

export class ConsoleLoggerTargetConfig extends LoggerTargetConfig {
    constructor(
        filters: Array<LogFilter> = []
    ) {
        super(filters);
    }
}
