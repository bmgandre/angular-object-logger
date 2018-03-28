'use strict';
/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function () {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': '../node_modules/'
    },
    // map tells the System loader where to look for things
    map: {

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      'tslib': 'npm:tslib/tslib.js',

      // other libraries
      rxjs: 'npm:rxjs',
      'stacktrace-js': 'npm:stacktrace-js/stacktrace.js',
      'stacktrace-gps': 'npm:stacktrace-gps/stacktrace-gps.js',
      'stack-generator': 'npm:stack-generator/stack-generator.js',
      'error-stack-parser': 'npm:error-stack-parser/error-stack-parser.js',
      'stackframe': 'npm:stackframe/stackframe.js',
      'source-map': 'npm:source-map/dist/source-map.js',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'angular-object-logger': '../dist/'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      '.': {
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular-object-logger': {
        main: '../dist/angular-object-logger.umd.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);
