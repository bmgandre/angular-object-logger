import { Injectable, Inject } from '@angular/core';
import { LoggerTargetService } from './logger-target-service.model';
import {
    LogEntry,
    TraceLogEntry,
    DebugLogEntry,
    InfoLogEntry,
    WarnLogEntry,
    ErrorLogEntry,
    FatalLogEntry,
    LogSource
  } from './log-entry.model';
import * as StackTrace from 'stacktrace-js';

@Injectable()
export class LoggerService {
  public source: string;

  public constructor(
    @Inject(LoggerTargetService) private targets: LoggerTargetService[]
  ) { }

  public trace(message: string, ...args: any[]): void;
  public trace(messageOrObject: string | any, exception?: Error): void;
  public trace(objOrmessage: string | any, ...exceptionOrRestArguments: any[]): void {
    StackTrace.get().then((sf) => {
      this.parseLog(new TraceLogEntry(this.source), this.parseLogSource(sf), objOrmessage, ...exceptionOrRestArguments);
    });
  }

  public debug(message: string, ...args: any[]): void;
  public debug(messageOrObject: string | any, exception?: Error): void;
  public debug(objOrmessage: string | any, ...exceptionOrRestArguments: any[]): void {
    StackTrace.get().then((sf) => {
      this.parseLog(new DebugLogEntry(this.source), this.parseLogSource(sf), objOrmessage, ...exceptionOrRestArguments);
    });
  }

  public info(message: string, ...args: any[]): void;
  public info(messageOrObject: string | any, exception?: Error): void;
  public info(objOrmessage: string | any, ...exceptionOrRestArguments: any[]): void {
    StackTrace.get().then((sf) => {
      this.parseLog(new InfoLogEntry(this.source), this.parseLogSource(sf), objOrmessage, ...exceptionOrRestArguments);
    });
  }

  public warn(message: string, ...args: any[]): void;
  public warn(messageOrObject: string | any, exception?: Error): void;
  public warn(objOrmessage: string | any, ...exceptionOrRestArguments: any[]): void {
    StackTrace.get().then((sf) => {
      this.parseLog(new WarnLogEntry(this.source), this.parseLogSource(sf), objOrmessage, ...exceptionOrRestArguments);
    });
  }

  public error(message: string, ...args: any[]): void;
  public error(messageOrObject: string | any, exception?: Error): void;
  public error(objOrmessage: string | any, ...exceptionOrRestArguments: any[]): void {
    StackTrace.get().then((sf) => {
      this.parseLog(new ErrorLogEntry(this.source), this.parseLogSource(sf), objOrmessage, ...exceptionOrRestArguments);
    });
  }

  public fatal(message: string, ...args: any[]): void;
  public fatal(messageOrObject: string | any, exception?: Error): void;
  public fatal(objOrmessage: string | any, ...exceptionOrRestArguments: any[]): void {
    StackTrace.get().then((sf) => {
      this.parseLog(new FatalLogEntry(this.source), this.parseLogSource(sf), objOrmessage, ...exceptionOrRestArguments);
    });
  }

  private format(str: string, applyFunction: (obj: any) => string, ...args: any[]): string {
    return str.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] !== 'undefined'
        ? applyFunction(args[number])
        : match;
    });
  }

  private parseLogSource(stackframeList: StackTrace.StackFrame[]): LogSource {
    const stackframe = stackframeList[1];
    return {
      method: stackframe.functionName,
      path: stackframe.source,
      line: stackframe.lineNumber,
      pos: stackframe.columnNumber,
      file: stackframe.fileName,
      stack: stackframeList.map(sf => sf.toString()).join('\n')
    };
  }

  private parseLog(baseLogEntry: LogEntry, logSource: LogSource,
    objOrmessage: string | any, ...exceptionOrRestArguments: any[]): void {
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
    message: string, ...args: any[]): void {
    const objToString = function(obj: any): string {
      if (typeof obj === 'object') {
        return JSON.stringify(obj);
      } else {
        return obj;
      }
    };
    const entry = { ...baseLogEntry, source: logSource, message: this.format(message, objToString, ...args) };
    this.targets.forEach(x => x.log(entry));
  }

  private logMessageWithException(baseLogEntry: LogEntry, logSource: LogSource,
    message: string, exception?: Error): void {
    const logEntry = typeof exception === 'undefined'
      ? { ...baseLogEntry, source: logSource, message: message }
      : { ...baseLogEntry, source: logSource, message: message, exception: exception };

    this.targets.forEach(x => x.log(logEntry));
  }

  private logObject(baseLogEntry: LogEntry, logSource: LogSource,
    obj: any, exception?: Error): void {
    const logEntry = typeof exception === 'undefined'
      ? { ...baseLogEntry, source: logSource, object: obj }
      : { ...baseLogEntry, source: logSource, object: obj, exception: exception };

    this.targets.forEach(x => x.log(logEntry));
  }
}
