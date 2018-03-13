import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  LogEntry,
  TraceLogEntry,
  DebugLogEntry,
  InfoLogEntry,
  ErrorLogEntry,
  WarnLogEntry,
  FatalLogEntry,
  LogSource
} from './log-entry.model';
import {
  LogFilter,
  FixedLevelLogFilter,
  MinMaxLevelLogFilter,
  MultiLevelLogFilter
} from './log-filter.model';
import { LogLevel } from './log-level.model';
import { LoggerTargetService } from './logger-target-service.model';
import { LoggerFactoryService, LoggerFactoryConfig } from './logger-factory.service';
import { LoggerService  } from './logger.service'
import { LoggerConsoleTargetService } from './logger-console-target.service';
import { LoggerWebTargetService } from './logger-web-target.service';

export * from './log-entry.model';
export * from './log-filter.model';
export * from './log-level.model';
export * from './logger-target-service.model';
export * from './logger-factory.service';
export * from './logger.service'
export * from './logger-console-target.service';
export * from './logger-web-target.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers : [
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
