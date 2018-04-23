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
import { LoggerConsoleTargetService } from './service/target/logger-console-target.service';
import { LoggerFactoryService } from './service/factory/logger-factory.service';
import { LoggerService } from './service/logger.service';
import { LoggerTargetService } from './service/target/logger-target-service';
import { LoggerWebTargetService } from './service/target/logger-web-target.service';
import { LogLevel } from './service/log-level.model';
import { MinMaxLevelLogFilter } from './service/filter/min-max-level-log-filter';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MultiLevelLogFilter } from './service/filter/multi-level-log-filter';
import { LoggerEnvironmentConfig } from './service/factory/logger-environment-config';
import { LoggerConfigReader } from './service/factory/logger-config-reader';
import { FilterParser } from './service/factory/filter-parser';
import { GlobalLogFilterParser } from './service/factory/global-log-filter-parser';
import { ConsoleTargetParser } from './service/factory/console-target-parser';
import { WebTargetParser } from './service/factory/web-target-parser';
import { MultiLevelLogFilterParser } from './service/factory/multi-level-log-filter-parser';
import { FixedLevelLogFilterParser } from './service/factory/fixed-level-log-filter-parser';
import { MinMaxLevelLogFilterParser } from './service/factory/min-max-level-log-filter-parser';

export * from './service/log-entry.model';
export * from './service/filter/log-filter';
export * from './service/log-level.model';
export * from './service/target/logger-target-service';
export * from './service/factory/logger-factory.service';
export * from './service/logger.service';
export * from './service/target/logger-console-target.service';
export * from './service/target/logger-web-target.service';
export * from './service/factory/logger-environment-config';
export * from './service/factory/logger-config-reader';
export * from './service/factory/filter-parser';
export * from './service/factory/global-log-filter-parser';
export * from './service/factory/console-target-parser';
export * from './service/factory/web-target-parser';

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
