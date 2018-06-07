import { LogFilter } from '../../filter/log-filter';
import { LoggerTargetConfig } from '../../config/target/logger-target-config';

export class WebLoggerTargetConfig extends LoggerTargetConfig {
    constructor(
        filters: Array<LogFilter> = [],
        public endpoint: string,
        public secret: string
    ) {
        super(filters);
    }
}
