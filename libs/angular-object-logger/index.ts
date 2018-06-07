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
  } from './src/log-entry.model';
import { FixedLevelLogFilter } from './src/filter/fixed-level-log-filter';
import { HttpClientModule } from '@angular/common/http';
import { LogFilter } from './src/filter/log-filter';
import { LoggerConsoleTargetService } from './src/console/target/logger-console-target.service';
import { LoggerFactoryService } from './src/factory/logger-factory.service';
import { LoggerService } from './src/logger.service';
import { LoggerTargetService } from './src/target/logger-target-service';
import { LoggerWebTargetService } from './src//web/target/logger-web-target.service';
import { LogLevel } from './src/log-level.model';
import { MinMaxLevelLogFilter } from './src/filter/min-max-level-log-filter';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MultiLevelLogFilter } from './src/filter/multi-level-log-filter';
import { LoggerEnvironmentConfig } from './src/config/logger-environment-config';
import { LoggerConfigReader } from './src/config/logger-config-reader';
import { FilterParser } from './src/config/filter/filter-parser';
import { GlobalLogFilterParser } from './src/config/filter/global-log-filter-parser';
import { ConsoleTargetParser } from './src/console/config/console-target-parser';
import { WebTargetParser } from './src/web/config/web-target-parser';
import { MultiLevelLogFilterParser } from './src/config/filter/multi-level-log-filter-parser';
import { FixedLevelLogFilterParser } from './src/config/filter/fixed-level-log-filter-parser';
import { MinMaxLevelLogFilterParser } from './src/config/filter/min-max-level-log-filter-parser';

export * from './src/log-entry.model';
export * from './src/filter/log-filter';
export * from './src/log-level.model';
export * from './src/target/logger-target-service';
export * from './src/factory/logger-factory.service';
export * from './src/logger.service';
export * from './src/console/target/logger-console-target.service';
export * from './src/web/target/logger-web-target.service';
export * from './src/config/logger-environment-config';
export * from './src/config/logger-config-reader';
export * from './src/config/filter/filter-parser';
export * from './src/config/filter/global-log-filter-parser';
export * from './src/console/config/console-target-parser';
export * from './src/web/config/web-target-parser';

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
