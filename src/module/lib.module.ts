import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
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
import {
  FixedLevelLogFilter,
  LogFilter,
  MinMaxLevelLogFilter,
  MultiLevelLogFilter
} from './service/log-filter.model';
import { LogLevel } from './service/log-level.model';
import { LoggerConsoleTargetService } from './service/logger-console-target.service';
import { LoggerFactoryConfig, LoggerFactoryService } from './service/logger-factory.service';
import { LoggerTargetService } from './service/logger-target-service.model';
import { LoggerWebTargetService } from './service/logger-web-target.service';
import { LoggerService } from './service/logger.service';

export * from './service/log-entry.model';
export * from './service/log-filter.model';
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
