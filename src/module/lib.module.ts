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
import { LoggerConsoleTargetService } from './service/logger-console-target.service';
import { LoggerFactoryConfig, LoggerFactoryService } from './service/logger-factory.service';
import { LoggerService } from './service/logger.service';
import { LoggerTargetService } from './service/logger-target-service.model';
import { LoggerWebTargetService } from './service/logger-web-target.service';
import { LogLevel } from './service/log-level.model';
import { MinMaxLevelLogFilter } from './service/filter/min-max-level-log-filter';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MultiLevelLogFilter } from './service/filter/multi-level-log-filter';

export * from './service/log-entry.model';
export * from './service/filter/log-filter';
export * from './service/log-level.model';
export * from './service/logger-target-service.model';
export * from './service/logger-factory.service';
export * from './service/logger.service';
export * from './service/logger-console-target.service';
export * from './service/logger-web-target.service';

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
    LoggerFactoryConfig
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
        LoggerFactoryConfig
      ]
    };
  }
}
