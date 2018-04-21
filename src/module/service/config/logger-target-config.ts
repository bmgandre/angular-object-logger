import { LogFilter } from '../filter/log-filter';

export class LoggerTargetConfig {
    constructor(
        public filters: Array<LogFilter> = []
    ) {}
}
