'use strict';

const stacktracejs = jest.genMockFromModule('stacktrace-js');

stacktracejs.get = function() {
    return Promise.resolve(mockStackTrace);
};

let mockStackTrace = Object.create(null);

stacktracejs.__setMockStackTrace = function(stackTraceList) {
    mockStackTrace = stackTraceList;
}

module.exports = stacktracejs;
