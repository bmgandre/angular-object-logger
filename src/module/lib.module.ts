import { CommonModule } from '@angular/common';
import {
  DebugLogEntry,
  ErrorLogEntry,
  FatalLogEntry,
  InfoLogEntry,
  LogEntry,
  LogSource,
  TraceLogEntry,
  WarnLogEntry
  } from './service/log-entry.model';
import { FixedLevelLogFilter } from './service/filter/fixed-level-log-filter';
import { HttpClientModule } from '@angular/common/http';
import { LogFilter } from './service/filter/log-filter';
import { LoggerConsoleTargetService } from './service/console/target/logger-console-target.service';
import { LoggerFactoryService } from './service/factory/logger-factory.service';
import { LoggerService } from './service/logger.service';
import { LoggerTargetService } from './service/target/logger-target-service';
import { LoggerWebTargetService } from './service//web/target/logger-web-target.service';
import { LogLevel } from './service/log-level.model';
import { MinMaxLevelLogFilter } from './service/filter/min-max-level-log-filter';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MultiLevelLogFilter } from './service/filter/multi-level-log-filter';
import { LoggerEnvironmentConfig } from './service/config/logger-environment-config';
import { LoggerConfigReader } from './service/config/logger-config-reader';
import { FilterParser } from './service/config/filter/filter-parser';
import { GlobalLogFilterParser } from './service/config/filter/global-log-filter-parser';
import { ConsoleTargetParser } from './service/console/config/console-target-parser';
import { WebTargetParser } from './service/web/config/web-target-parser';
import { MultiLevelLogFilterParser } from './service/config/filter/multi-level-log-filter-parser';
import { FixedLevelLogFilterParser } from './service/config/filter/fixed-level-log-filter-parser';
import { MinMaxLevelLogFilterParser } from './service/config/filter/min-max-level-log-filter-parser';

export * from './service/log-entry.model';
export * from './service/filter/log-filter';
export * from './service/log-level.model';
export * from './service/target/logger-target-service';
export * from './service/factory/logger-factory.service';
export * from './service/logger.service';
export * from './service/console/target/logger-console-target.service';
export * from './service/web/target/logger-web-target.service';
export * from './service/config/logger-environment-config';
export * from './service/config/logger-config-reader';
export * from './service/config/filter/filter-parser';
export * from './service/config/filter/global-log-filter-parser';
export * from './service/console/config/console-target-parser';
export * from './service/web/config/web-target-parser';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LoggerWebTargetService,
    LoggerConsoleTargetService,
    LoggerService,
    LoggerFactoryService,
    LoggerConfigReader,
    FilterParser,
    GlobalLogFilterParser,
    ConsoleTargetParser,
    WebTargetParser,
    MultiLevelLogFilterParser,
    FixedLevelLogFilterParser,
    MinMaxLevelLogFilterParser
  ]
})
export class LoggerServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LoggerServiceModule,
      providers: [
        LoggerWebTargetService,
        LoggerConsoleTargetService,
        LoggerService,
        LoggerFactoryService,
        LoggerConfigReader,
        FilterParser,
        GlobalLogFilterParser,
        ConsoleTargetParser,
        WebTargetParser,
        MultiLevelLogFilterParser,
        FixedLevelLogFilterParser,
        MinMaxLevelLogFilterParser
      ]
    };
  }
}
