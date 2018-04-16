import { Inject, Injectable } from '@angular/core';
import * as StackTrace from 'stacktrace-js';
import {
  DebugLogEntry,
  ErrorLogEntry,
  FatalLogEntry,
  InfoLogEntry,
  LogEntry,
  LogSource,
  TraceLogEntry,
  WarnLogEntry
} from './log-entry.model';
import { LoggerTargetService } from './target/logger-target-service';

// @dynamic
@Injectable()
export class LoggerService {
  source: string;

  private static format(str: string, applyFunction: (obj: any) => string, ...args: Array<any>): string {
    return str.replace(/{(\d+)}/g, (match, index) => {
      return typeof args[index] !== 'undefined'
        ? applyFunction(args[index])
        : match;
    });
  }

  private static parseLogSource(stackframeList: Array<StackTrace.StackFrame>): LogSource {
    const stackframe = stackframeList[1];
    const stack = stackframeList.map(sf => sf.toString())
      .join('\n');

    return {
      file: stackframe.fileName,
      line: stackframe.lineNumber,
      method: stackframe.functionName,
      path: stackframe.source,
      pos: stackframe.columnNumber,
      stack
    };
  }

  constructor(
    @Inject(LoggerTargetService) private targets: Array<LoggerTargetService>
  ) { }

  trace(message: string, ...args: Array<any>): void;
  trace(messageOrObject: string | any, exception?: Error): void;
  trace(objOrmessage: string | any, ...exceptionOrRestArguments: Array<any>): void {
    StackTrace.get()
      .then(sf => {
        this.parseLog(new TraceLogEntry(this.source), LoggerService.parseLogSource(sf), objOrmessage, ...exceptionOrRestArguments);
      });
  }

  debug(message: string, ...args: Array<any>): void;
  debug(messageOrObject: string | any, exception?: Error): void;
  debug(objOrmessage: string | any, ...exceptionOrRestArguments: Array<any>): void {
    StackTrace.get()
      .then(sf => {
        this.parseLog(new DebugLogEntry(this.source), LoggerService.parseLogSource(sf), objOrmessage, ...exceptionOrRestArguments);
      });
  }

  info(message: string, ...args: Array<any>): void;
  info(messageOrObject: string | any, exception?: Error): void;
  info(objOrmessage: string | any, ...exceptionOrRestArguments: Array<any>): void {
    StackTrace.get()
      .then(sf => {
        this.parseLog(new InfoLogEntry(this.source), LoggerService.parseLogSource(sf), objOrmessage, ...exceptionOrRestArguments);
      });
  }

  warn(message: string, ...args: Array<any>): void;
  warn(messageOrObject: string | any, exception?: Error): void;
  warn(objOrmessage: string | any, ...exceptionOrRestArguments: Array<any>): void {
    StackTrace.get()
      .then(sf => {
        this.parseLog(new WarnLogEntry(this.source), LoggerService.parseLogSource(sf), objOrmessage, ...exceptionOrRestArguments);
      });
  }

  error(message: string, ...args: Array<any>): void;
  error(messageOrObject: string | any, exception?: Error): void;
  error(objOrmessage: string | any, ...exceptionOrRestArguments: Array<any>): void {
    StackTrace.get()
      .then(sf => {
        this.parseLog(new ErrorLogEntry(this.source), LoggerService.parseLogSource(sf), objOrmessage, ...exceptionOrRestArguments);
      });
  }

  fatal(message: string, ...args: Array<any>): void;
  fatal(messageOrObject: string | any, exception?: Error): void;
  fatal(objOrmessage: string | any, ...exceptionOrRestArguments: Array<any>): void {
    StackTrace.get()
      .then(sf => {
        this.parseLog(new FatalLogEntry(this.source), LoggerService.parseLogSource(sf), objOrmessage, ...exceptionOrRestArguments);
      });
  }

  private parseLog(baseLogEntry: LogEntry, logSource: LogSource,
                   objOrmessage: string | any, ...exceptionOrRestArguments: Array<any>): void {
    if (typeof objOrmessage === 'string') {
      if (exceptionOrRestArguments[0] instanceof Error) {
        this.logMessageWithException(baseLogEntry, logSource, objOrmessage, exceptionOrRestArguments[0] as Error);
      } else {
        this.logMessageWithFormat(baseLogEntry, logSource, objOrmessage, ...exceptionOrRestArguments);
      }
    } else {
      this.logObject(baseLogEntry, logSource, objOrmessage, exceptionOrRestArguments[0] as Error);
    }
  }

  private logMessageWithFormat(baseLogEntry: LogEntry, logSource: LogSource,
                               message: string, ...args: Array<any>): void {
    const objToString = (obj: any): string => {
      if (typeof obj === 'object') {
        return JSON.stringify(obj);
      } else {
        return obj;
      }
    };
    const entry = { ...baseLogEntry, source: logSource, message: LoggerService.format(message, objToString, ...args) };
    this.targets.forEach(x => x.log(entry));
  }

  private logMessageWithException(baseLogEntry: LogEntry, logSource: LogSource,
                                  message: string, exception?: Error): void {
    const logEntry = typeof exception === 'undefined'
      ? { ...baseLogEntry, source: logSource, message }
      : { ...baseLogEntry, source: logSource, message, exception };

    this.targets.forEach(x => x.log(logEntry));
  }

  private logObject(baseLogEntry: LogEntry, logSource: LogSource,
                    obj: any, exception?: Error): void {
    const logEntry = typeof exception === 'undefined'
      ? { ...baseLogEntry, source: logSource, object: obj }
      : { ...baseLogEntry, source: logSource, object: obj, exception };

    this.targets.forEach(x => x.log(logEntry));
  }
}
