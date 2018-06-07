import { Component, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';

import {
  LoggerEnvironmentConfig,
  LoggerFactoryService,
  LoggerService,
  LoggerServiceModule
} from 'angular-object-logger';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  providers: [
    { provide: LoggerEnvironmentConfig, useValue: environment }
  ],
  imports: [ BrowserModule, HttpClientModule, LoggerServiceModule ]
})
export class AppModule { }
