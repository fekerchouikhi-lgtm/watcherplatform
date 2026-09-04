var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// .wrangler/tmp/bundle-s1uCM3/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [
      stripCfConnectingIPHeader.apply(null, argArray)
    ]);
  }
});

// node_modules/unenv/dist/runtime/_internal/utils.mjs
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
__name(PerformanceEntry, "PerformanceEntry");
var PerformanceMark = /* @__PURE__ */ __name(class PerformanceMark2 extends PerformanceEntry {
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
}, "PerformanceMark");
var PerformanceMeasure = class extends PerformanceEntry {
  entryType = "measure";
};
__name(PerformanceMeasure, "PerformanceMeasure");
var PerformanceResourceTiming = class extends PerformanceEntry {
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
__name(PerformanceResourceTiming, "PerformanceResourceTiming");
var PerformanceObserverEntryList = class {
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
__name(PerformanceObserverEntryList, "PerformanceObserverEntryList");
var Performance = class {
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
__name(Performance, "Performance");
var PerformanceObserver = class {
  __unenv__ = true;
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
__name(PerformanceObserver, "PerformanceObserver");
__publicField(PerformanceObserver, "supportedEntryTypes", []);
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
import { Socket } from "node:net";
var ReadStream = class extends Socket {
  fd;
  constructor(fd) {
    super();
    this.fd = fd;
  }
  isRaw = false;
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
  isTTY = false;
};
__name(ReadStream, "ReadStream");

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
import { Socket as Socket2 } from "node:net";
var WriteStream = class extends Socket2 {
  fd;
  constructor(fd) {
    super();
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  columns = 80;
  rows = 24;
  isTTY = false;
};
__name(WriteStream, "WriteStream");

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class extends EventEmitter {
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return "";
  }
  get versions() {
    return {};
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  ref() {
  }
  unref() {
  }
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: () => 0 });
  mainModule = void 0;
  domain = void 0;
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};
__name(Process, "Process");

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var { exit, platform, nextTick } = getBuiltinModule(
  "node:process"
);
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  nextTick
});
var {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  finalization,
  features,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  on,
  off,
  once,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// node_modules/hono/dist/compose.js
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context2, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context2.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context2, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context2.error = err;
            res = await onError(err, context2);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context2.finalized === false && onNotFound) {
          res = await onNotFound(context2);
        }
      }
      if (res && (context2.finalized === false || isError)) {
        context2.res = res;
      }
      return context2;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// node_modules/hono/dist/utils/buffer.js
var bufferToFormData = /* @__PURE__ */ __name((arrayBuffer, contentType) => {
  const response = new Response(arrayBuffer, {
    headers: {
      // Normalize the media type (case-insensitive) while keeping parameters like the boundary
      "Content-Type": contentType.replace(/^[^;]+/, (mediaType) => mediaType.toLowerCase())
    }
  });
  return response.formData();
}, "bufferToFormData");

// node_modules/hono/dist/utils/body.js
var MAX_NESTING_DEPTH = 32;
var MAX_NESTED_OBJECTS = 1e4;
var isRawRequest = /* @__PURE__ */ __name((request) => "headers" in request, "isRawRequest");
var parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = isRawRequest(request) ? request.headers : request.raw.headers;
  const contentType = headers.get("Content-Type");
  const mediaType = contentType?.split(";")[0].trim().toLowerCase();
  if (mediaType === "multipart/form-data" || mediaType === "application/x-www-form-urlencoded") {
    return parseFormData(request, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request, options) {
  if (!isRawRequest(request) && request.bodyCache.formData) {
    return convertFormDataToBodyData(
      await request.bodyCache.formData,
      options
    );
  }
  const headers = isRawRequest(request) ? request.headers : request.raw.headers;
  const arrayBuffer = await request.arrayBuffer();
  const formDataPromise = bufferToFormData(arrayBuffer, headers.get("Content-Type") || "");
  if (!isRawRequest(request)) {
    request.bodyCache.formData = formDataPromise;
  }
  const formData = await formDataPromise;
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  const nestingState = { count: 0 };
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value, nestingState);
        delete form[key];
      }
    });
  }
  return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value, state) => {
  if (/(?:^|\.)__proto__\./.test(key)) {
    return;
  }
  let nestedForm = form;
  const keys = key.split(".", MAX_NESTING_DEPTH + 2);
  if (keys.length > MAX_NESTING_DEPTH + 1) {
    throwNestingLimitExceeded();
  }
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        if (state.count++ >= MAX_NESTED_OBJECTS) {
          throwNestingLimitExceeded();
        }
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");
var throwNestingLimitExceeded = /* @__PURE__ */ __name(() => {
  throw new Error("Nesting limit exceeded");
}, "throwNestingLimitExceeded");

// node_modules/hono/dist/utils/url.js
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path = url.slice(start, end);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (segment.charCodeAt(segment.length - 1) === 63) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.slice(0, -1);
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
}, "checkOptionalParameter");
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => str.indexOf("%") !== -1 ? tryDecode(str, decodeURIComponent_) : str, "tryDecodeURIComponent");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return tryDecodeURIComponent(value);
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  const hashIndex = url.indexOf("#", 8);
  if (hashIndex !== -1) {
    url = url.slice(0, hashIndex);
  }
  let encoded;
  if (!multiple && key && key.indexOf("%") === -1 && key.indexOf("+") === -1) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = /* @__PURE__ */ Object.create(null);
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var HonoRequest = /* @__PURE__ */ __name(class {
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex]?.[1][key];
    const param = this.#getParamValue(paramKey);
    return param && tryDecodeURIComponent(param);
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex]?.[1] ?? {});
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = tryDecodeURIComponent(value);
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = /* @__PURE__ */ Object.create(null);
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    for (const anyCachedKey in bodyCache) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  };
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * `.bytes()` parses the request body as a `Uint8Array`.
   *
   * @see {@link https://hono.dev/docs/api/request#bytes}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.bytes()
   * })
   * ```
   */
  bytes() {
    return this.#cachedBody("arrayBuffer").then((buffer) => new Uint8Array(buffer));
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    ;
    (this.#validatedData ??= {})[target] = data;
  }
  valid(target) {
    return this.#validatedData?.[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
}, "HonoRequest");

// node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context2, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context: context2 }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context2, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
}, "setDefaultContentType");
var createResponseInstance = /* @__PURE__ */ __name((body, init) => new Response(body, init), "createResponseInstance");
var Context = /* @__PURE__ */ __name(class {
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= createResponseInstance(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = (layout2) => this.#layout = layout2;
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = () => this.#layout;
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   // Append multiple headers using the append option (e.g. Vary)
   *   c.header('Vary', 'Accept-Encoding', { append: true })
   *   c.header('Vary', 'User-Agent', { append: true })
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = (name, value, options) => {
    if (this.finalized) {
      this.#res = createResponseInstance(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  };
  status = (status) => {
    this.#status = status;
  };
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  };
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = (key) => {
    return this.#var ? this.#var.get(key) : void 0;
  };
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    let responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders;
    if (typeof arg === "object" && arg.headers) {
      responseHeaders ??= new Headers();
      for (const [key, value] of new Headers(arg.headers)) {
        if (key === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      if (!responseHeaders) {
        let count3 = 0;
        for (const k in headers) {
          if (++count3 > 1 || typeof headers[k] !== "string") {
            responseHeaders = new Headers();
            break;
          }
        }
      }
      if (responseHeaders) {
        for (const k in headers) {
          const v = headers[k];
          if (typeof v === "string") {
            responseHeaders.set(k, v);
          } else {
            responseHeaders.delete(k);
            for (const v2 of v) {
              responseHeaders.append(k, v2);
            }
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, {
      status,
      headers: responseHeaders ?? headers
    });
  }
  newResponse = (...args) => this.#newResponse(...args);
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = (data, arg, headers) => this.#newResponse(data, arg, headers);
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = (text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  };
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = (object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  };
  html = (html, arg, headers) => {
    const res = /* @__PURE__ */ __name((html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  };
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = (location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibyes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  };
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = () => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  };
}, "Context");

// node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch", "query"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = /* @__PURE__ */ __name(class extends Error {
}, "UnsupportedPathError");

// node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c) => {
  return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = /* @__PURE__ */ __name(class _Hono {
  get;
  post;
  put;
  delete;
  options;
  patch;
  query;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler, r.basePath);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = this.getPath(request).slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = /* @__PURE__ */ __name(async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler, baseRoutePath) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = {
      basePath: baseRoutePath !== void 0 ? mergePath(this._basePath, baseRoutePath) : this._basePath,
      path,
      method,
      handler
    };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env2, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env2, "GET")))();
    }
    const path = this.getPath(request, { env: env2 });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env: env2,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context2 = await composed(c);
        if (!context2.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context2.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} env - env Object
   * @param {ExecutionContext} executionCtx - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  };
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  };
}, "_Hono");

// node_modules/hono/dist/router/utils.js
var createNullObject = /* @__PURE__ */ __name(() => /* @__PURE__ */ Object.create(null), "createNullObject");

// node_modules/hono/dist/router/reg-exp-router/matcher.js
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = /* @__PURE__ */ __name((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  }, "match2");
  this.match = match2;
  return match2(method, path);
}
__name(match, "match");

// node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return b === TAIL_WILDCARD_REG_EXP_STR ? -1 : 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
__name(compareKey, "compareKey");
var Node = /* @__PURE__ */ __name(class _Node {
  // handler index of a dynamic path, or -1 for a static path terminal
  #index;
  #varIndex;
  #children = createNullObject();
  insert(tokens, index, paramMap, context2, isStatic) {
    let node = this;
    for (let i = 0, len = tokens.length; i < len; i++) {
      const token = tokens[i];
      const pattern = token.length === 1 ? token === "*" ? i === len - 1 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : null : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
      let nextNode;
      if (pattern) {
        const name = pattern[1];
        let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
        if (name && pattern[2]) {
          if (regexpStr === ".*") {
            throw PATH_ERROR;
          }
          regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
          if (/\((?!\?:)/.test(regexpStr)) {
            throw PATH_ERROR;
          }
          if (regexpStr.length === 1 && regExpMetaChars.has(regexpStr)) {
            throw PATH_ERROR;
          }
        }
        nextNode = node.#children[regexpStr];
        if (!nextNode) {
          if (regexpStr !== ONLY_WILDCARD_REG_EXP_STR && regexpStr !== TAIL_WILDCARD_REG_EXP_STR) {
            for (const k in node.#children) {
              if (
                // a single-char pattern coexists with single-char literals as a literal does
                (regexpStr.length > 1 || k.length > 1) && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
              ) {
                throw PATH_ERROR;
              }
            }
          }
          nextNode = node.#children[regexpStr] = new _Node();
        }
        if (name !== "") {
          nextNode.#varIndex ??= context2.varIndex++;
          paramMap.push([name, nextNode.#varIndex]);
        }
      } else {
        nextNode = node.#children[token];
        if (!nextNode) {
          for (const k in node.#children) {
            if (k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR) {
              throw PATH_ERROR;
            }
          }
          nextNode = node.#children[token] = new _Node();
        }
      }
      node = nextNode;
    }
    if (node.#index !== void 0) {
      throw PATH_ERROR;
    }
    node.#index = isStatic ? -1 : index;
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      const childStr = c.buildRegExpStr();
      return childStr === "" ? "" : (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + childStr;
    }).filter(Boolean);
    if (typeof this.#index === "number" && this.#index !== -1) {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
}, "_Node");

// node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = /* @__PURE__ */ __name(class {
  #context = { varIndex: 0 };
  #root = new Node();
  #index = 0;
  // dynamic path -> [handler index, param assoc]; static paths are not registered
  paths = createNullObject();
  insert(path, isStatic) {
    if (isStatic) {
      this.#root.insert(path.split(""), 0, [], this.#context, true);
      return;
    }
    const paramAssoc = [];
    const groups = [];
    let markedPath = path;
    for (let i = 0; ; ) {
      let replaced = false;
      markedPath = markedPath.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = markedPath.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, this.#index, paramAssoc, this.#context, false);
    this.paths[path] = [this.#index++, paramAssoc];
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
}, "Trie");

// node_modules/hono/dist/router/reg-exp-router/router.js
var wildcardRegExpCache = createNullObject();
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    `^${path.replace(
      /\/:[^/{}]+(?:\{\[\^\/]\+})?(?=[/{]|$)|\/?\*$|([.\\+*[^\]$()?{}|])/g,
      (match2, metaChar) => metaChar ? `\\${metaChar}` : match2 === "/*" ? TAIL_WILDCARD_REG_EXP_STR : match2 === "*" ? ONLY_WILDCARD_REG_EXP_STR : `/:${LABEL_REG_EXP_STR}`
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function findMiddleware(middleware, path) {
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = /* @__PURE__ */ __name(class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  #tries;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: createNullObject() };
    this.#routes = { [METHOD_NAME_ALL]: createNullObject() };
    this.#tries = { [METHOD_NAME_ALL]: new Trie() };
  }
  #insertPath(method, path) {
    try {
      this.#tries[method].insert(path, !/\*|\/:/.test(path));
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      this.#tries[method] = new Trie();
      for (const handlerMap of [middleware, routes]) {
        handlerMap[method] = createNullObject();
        for (const p in handlerMap[METHOD_NAME_ALL]) {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
          this.#insertPath(method, p);
        }
      }
    }
    if (path === "/*") {
      path = "*";
    }
    const methods = method === METHOD_NAME_ALL ? Object.keys(middleware) : [method];
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      for (const m of methods) {
        if (!middleware[m][path]) {
          this.#insertPath(m, path);
          middleware[m][path] = findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        }
      }
      for (const handlerMap of [middleware, routes]) {
        for (const m of methods) {
          for (const p in handlerMap[m]) {
            re.test(p) && handlerMap[m][p].push([handler, path]);
          }
        }
      }
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (const path2 of paths) {
      for (const m of methods) {
        if (!routes[m][path2]) {
          this.#insertPath(m, path2);
          routes[m][path2] = findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || [];
        }
        routes[m][path2].push([handler, path2]);
      }
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = createNullObject();
    for (const method of Object.keys(this.#routes)) {
      matchers[method] = this.#buildMatcher(method);
    }
    this.#middleware = this.#routes = this.#tries = void 0;
    wildcardRegExpCache = createNullObject();
    return matchers;
  }
  #buildMatcher(method) {
    const middleware = this.#middleware[method];
    const routes = this.#routes[method];
    const trie = this.#tries[method];
    const staticMap = createNullObject();
    const handlerData = [];
    const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
    for (const r of [middleware, routes]) {
      for (const path in r) {
        const handlers = r[path];
        const pathData = trie.paths[path];
        if (!pathData) {
          staticMap[path] = [handlers.map(([h]) => [h, createNullObject()]), emptyParam];
          continue;
        }
        handlerData[pathData[0]] = handlers.map(([h, handlerPath]) => [
          h,
          trie.paths[handlerPath][1].reduceRight((map, [key], i) => {
            map[key] = paramReplacementMap[pathData[1][i][1]];
            return map;
          }, createNullObject())
        ]);
      }
    }
    return [regexp, indexReplacementMap.map((i) => handlerData[i]), staticMap];
  }
}, "RegExpRouter");

// node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = /* @__PURE__ */ __name(class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
}, "SmartRouter");

// node_modules/hono/dist/router/trie-router/node.js
var emptyParams = createNullObject();
var order = 0;
var Node2 = /* @__PURE__ */ __name(class _Node2 {
  #methods = [];
  #children = createNullObject();
  #patterns = [];
  #pattern;
  #params = emptyParams;
  insert(method, path, handler) {
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = /* @__PURE__ */ new Set();
    let i = 0;
    for (const p of parts) {
      const nextP = parts[++i];
      const pattern = getPattern(p, nextP) || (nextP === void 0 && p && p.indexOf("*") === p.length - 1 ? p : null);
      const isParam = Array.isArray(pattern);
      const key = isParam ? pattern[0] : pattern || p;
      const child = curNode.#children[key] ||= new _Node2();
      if (pattern && !child.#pattern) {
        child.#pattern = pattern;
        curNode.#patterns.push(child);
      }
      curNode = child;
      if (isParam) {
        possibleKeys.add(pattern[1]);
      }
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: [...possibleKeys],
        score: ++order
      }
    });
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      if (handlerSet) {
        handlerSet.params = createNullObject();
        handlerSets.push(handlerSet);
        for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
          const key = handlerSet.possibleKeys[i2];
          handlerSet.params[key] = params?.[key] && !i2 ? params[key] : nodeParams[key] ?? params?.[key];
        }
      }
    }
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (const child of node.#patterns) {
          const pattern = child.#pattern;
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (typeof pattern === "string") {
            if (pattern === "*" || part.startsWith(pattern.slice(0, -1))) {
              this.#pushHandlerSets(handlerSets, child, method, node.#params);
              if (pattern === "*") {
                child.#params = params;
                tempNodes.push(child);
              }
            }
            continue;
          }
          const [, name, matcher] = pattern;
          if (!part && matcher === true) {
            continue;
          }
          if (matcher !== true) {
            if (!partOffsets) {
              partOffsets = [];
              let offset = path[0] === "/" ? 1 : 0;
              for (let p = 0; p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path.slice(partOffsets[i]);
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (m[0].length === restPathString.length && child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  node.#params,
                  params
                );
              }
              for (const _ in child.#children) {
                child.#params = params;
                const componentCount = m[0].match(/\//g)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
                break;
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  params,
                  node.#params
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets[1]) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
}, "_Node");

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = /* @__PURE__ */ __name(class {
  name = "TrieRouter";
  #node = new Node2();
  add(method, path, handler) {
    for (const result of checkOptionalParameter(path) || [path]) {
      this.#node.insert(method, result, handler);
    }
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
}, "TrieRouter");

// node_modules/hono/dist/hono.js
var Hono2 = /* @__PURE__ */ __name(class extends Hono {
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
}, "Hono");

// node_modules/@google/generative-ai/dist/index.mjs
var SchemaType;
(function(SchemaType2) {
  SchemaType2["STRING"] = "string";
  SchemaType2["NUMBER"] = "number";
  SchemaType2["INTEGER"] = "integer";
  SchemaType2["BOOLEAN"] = "boolean";
  SchemaType2["ARRAY"] = "array";
  SchemaType2["OBJECT"] = "object";
})(SchemaType || (SchemaType = {}));
var ExecutableCodeLanguage;
(function(ExecutableCodeLanguage2) {
  ExecutableCodeLanguage2["LANGUAGE_UNSPECIFIED"] = "language_unspecified";
  ExecutableCodeLanguage2["PYTHON"] = "python";
})(ExecutableCodeLanguage || (ExecutableCodeLanguage = {}));
var Outcome;
(function(Outcome2) {
  Outcome2["OUTCOME_UNSPECIFIED"] = "outcome_unspecified";
  Outcome2["OUTCOME_OK"] = "outcome_ok";
  Outcome2["OUTCOME_FAILED"] = "outcome_failed";
  Outcome2["OUTCOME_DEADLINE_EXCEEDED"] = "outcome_deadline_exceeded";
})(Outcome || (Outcome = {}));
var POSSIBLE_ROLES = ["user", "model", "function", "system"];
var HarmCategory;
(function(HarmCategory2) {
  HarmCategory2["HARM_CATEGORY_UNSPECIFIED"] = "HARM_CATEGORY_UNSPECIFIED";
  HarmCategory2["HARM_CATEGORY_HATE_SPEECH"] = "HARM_CATEGORY_HATE_SPEECH";
  HarmCategory2["HARM_CATEGORY_SEXUALLY_EXPLICIT"] = "HARM_CATEGORY_SEXUALLY_EXPLICIT";
  HarmCategory2["HARM_CATEGORY_HARASSMENT"] = "HARM_CATEGORY_HARASSMENT";
  HarmCategory2["HARM_CATEGORY_DANGEROUS_CONTENT"] = "HARM_CATEGORY_DANGEROUS_CONTENT";
  HarmCategory2["HARM_CATEGORY_CIVIC_INTEGRITY"] = "HARM_CATEGORY_CIVIC_INTEGRITY";
})(HarmCategory || (HarmCategory = {}));
var HarmBlockThreshold;
(function(HarmBlockThreshold2) {
  HarmBlockThreshold2["HARM_BLOCK_THRESHOLD_UNSPECIFIED"] = "HARM_BLOCK_THRESHOLD_UNSPECIFIED";
  HarmBlockThreshold2["BLOCK_LOW_AND_ABOVE"] = "BLOCK_LOW_AND_ABOVE";
  HarmBlockThreshold2["BLOCK_MEDIUM_AND_ABOVE"] = "BLOCK_MEDIUM_AND_ABOVE";
  HarmBlockThreshold2["BLOCK_ONLY_HIGH"] = "BLOCK_ONLY_HIGH";
  HarmBlockThreshold2["BLOCK_NONE"] = "BLOCK_NONE";
})(HarmBlockThreshold || (HarmBlockThreshold = {}));
var HarmProbability;
(function(HarmProbability2) {
  HarmProbability2["HARM_PROBABILITY_UNSPECIFIED"] = "HARM_PROBABILITY_UNSPECIFIED";
  HarmProbability2["NEGLIGIBLE"] = "NEGLIGIBLE";
  HarmProbability2["LOW"] = "LOW";
  HarmProbability2["MEDIUM"] = "MEDIUM";
  HarmProbability2["HIGH"] = "HIGH";
})(HarmProbability || (HarmProbability = {}));
var BlockReason;
(function(BlockReason2) {
  BlockReason2["BLOCKED_REASON_UNSPECIFIED"] = "BLOCKED_REASON_UNSPECIFIED";
  BlockReason2["SAFETY"] = "SAFETY";
  BlockReason2["OTHER"] = "OTHER";
})(BlockReason || (BlockReason = {}));
var FinishReason;
(function(FinishReason2) {
  FinishReason2["FINISH_REASON_UNSPECIFIED"] = "FINISH_REASON_UNSPECIFIED";
  FinishReason2["STOP"] = "STOP";
  FinishReason2["MAX_TOKENS"] = "MAX_TOKENS";
  FinishReason2["SAFETY"] = "SAFETY";
  FinishReason2["RECITATION"] = "RECITATION";
  FinishReason2["LANGUAGE"] = "LANGUAGE";
  FinishReason2["BLOCKLIST"] = "BLOCKLIST";
  FinishReason2["PROHIBITED_CONTENT"] = "PROHIBITED_CONTENT";
  FinishReason2["SPII"] = "SPII";
  FinishReason2["MALFORMED_FUNCTION_CALL"] = "MALFORMED_FUNCTION_CALL";
  FinishReason2["OTHER"] = "OTHER";
})(FinishReason || (FinishReason = {}));
var TaskType;
(function(TaskType2) {
  TaskType2["TASK_TYPE_UNSPECIFIED"] = "TASK_TYPE_UNSPECIFIED";
  TaskType2["RETRIEVAL_QUERY"] = "RETRIEVAL_QUERY";
  TaskType2["RETRIEVAL_DOCUMENT"] = "RETRIEVAL_DOCUMENT";
  TaskType2["SEMANTIC_SIMILARITY"] = "SEMANTIC_SIMILARITY";
  TaskType2["CLASSIFICATION"] = "CLASSIFICATION";
  TaskType2["CLUSTERING"] = "CLUSTERING";
})(TaskType || (TaskType = {}));
var FunctionCallingMode;
(function(FunctionCallingMode2) {
  FunctionCallingMode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
  FunctionCallingMode2["AUTO"] = "AUTO";
  FunctionCallingMode2["ANY"] = "ANY";
  FunctionCallingMode2["NONE"] = "NONE";
})(FunctionCallingMode || (FunctionCallingMode = {}));
var DynamicRetrievalMode;
(function(DynamicRetrievalMode2) {
  DynamicRetrievalMode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
  DynamicRetrievalMode2["MODE_DYNAMIC"] = "MODE_DYNAMIC";
})(DynamicRetrievalMode || (DynamicRetrievalMode = {}));
var GoogleGenerativeAIError = class extends Error {
  constructor(message) {
    super(`[GoogleGenerativeAI Error]: ${message}`);
  }
};
__name(GoogleGenerativeAIError, "GoogleGenerativeAIError");
var GoogleGenerativeAIResponseError = class extends GoogleGenerativeAIError {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
};
__name(GoogleGenerativeAIResponseError, "GoogleGenerativeAIResponseError");
var GoogleGenerativeAIFetchError = class extends GoogleGenerativeAIError {
  constructor(message, status, statusText, errorDetails) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    this.errorDetails = errorDetails;
  }
};
__name(GoogleGenerativeAIFetchError, "GoogleGenerativeAIFetchError");
var GoogleGenerativeAIRequestInputError = class extends GoogleGenerativeAIError {
};
__name(GoogleGenerativeAIRequestInputError, "GoogleGenerativeAIRequestInputError");
var GoogleGenerativeAIAbortError = class extends GoogleGenerativeAIError {
};
__name(GoogleGenerativeAIAbortError, "GoogleGenerativeAIAbortError");
var DEFAULT_BASE_URL = "https://generativelanguage.googleapis.com";
var DEFAULT_API_VERSION = "v1beta";
var PACKAGE_VERSION = "0.24.1";
var PACKAGE_LOG_HEADER = "genai-js";
var Task;
(function(Task2) {
  Task2["GENERATE_CONTENT"] = "generateContent";
  Task2["STREAM_GENERATE_CONTENT"] = "streamGenerateContent";
  Task2["COUNT_TOKENS"] = "countTokens";
  Task2["EMBED_CONTENT"] = "embedContent";
  Task2["BATCH_EMBED_CONTENTS"] = "batchEmbedContents";
})(Task || (Task = {}));
var RequestUrl = class {
  constructor(model, task, apiKey, stream, requestOptions) {
    this.model = model;
    this.task = task;
    this.apiKey = apiKey;
    this.stream = stream;
    this.requestOptions = requestOptions;
  }
  toString() {
    var _a, _b;
    const apiVersion = ((_a = this.requestOptions) === null || _a === void 0 ? void 0 : _a.apiVersion) || DEFAULT_API_VERSION;
    const baseUrl = ((_b = this.requestOptions) === null || _b === void 0 ? void 0 : _b.baseUrl) || DEFAULT_BASE_URL;
    let url = `${baseUrl}/${apiVersion}/${this.model}:${this.task}`;
    if (this.stream) {
      url += "?alt=sse";
    }
    return url;
  }
};
__name(RequestUrl, "RequestUrl");
function getClientHeaders(requestOptions) {
  const clientHeaders = [];
  if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.apiClient) {
    clientHeaders.push(requestOptions.apiClient);
  }
  clientHeaders.push(`${PACKAGE_LOG_HEADER}/${PACKAGE_VERSION}`);
  return clientHeaders.join(" ");
}
__name(getClientHeaders, "getClientHeaders");
async function getHeaders(url) {
  var _a;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("x-goog-api-client", getClientHeaders(url.requestOptions));
  headers.append("x-goog-api-key", url.apiKey);
  let customHeaders = (_a = url.requestOptions) === null || _a === void 0 ? void 0 : _a.customHeaders;
  if (customHeaders) {
    if (!(customHeaders instanceof Headers)) {
      try {
        customHeaders = new Headers(customHeaders);
      } catch (e) {
        throw new GoogleGenerativeAIRequestInputError(`unable to convert customHeaders value ${JSON.stringify(customHeaders)} to Headers: ${e.message}`);
      }
    }
    for (const [headerName, headerValue] of customHeaders.entries()) {
      if (headerName === "x-goog-api-key") {
        throw new GoogleGenerativeAIRequestInputError(`Cannot set reserved header name ${headerName}`);
      } else if (headerName === "x-goog-api-client") {
        throw new GoogleGenerativeAIRequestInputError(`Header name ${headerName} can only be set using the apiClient field`);
      }
      headers.append(headerName, headerValue);
    }
  }
  return headers;
}
__name(getHeaders, "getHeaders");
async function constructModelRequest(model, task, apiKey, stream, body, requestOptions) {
  const url = new RequestUrl(model, task, apiKey, stream, requestOptions);
  return {
    url: url.toString(),
    fetchOptions: Object.assign(Object.assign({}, buildFetchOptions(requestOptions)), { method: "POST", headers: await getHeaders(url), body })
  };
}
__name(constructModelRequest, "constructModelRequest");
async function makeModelRequest(model, task, apiKey, stream, body, requestOptions = {}, fetchFn = fetch) {
  const { url, fetchOptions } = await constructModelRequest(model, task, apiKey, stream, body, requestOptions);
  return makeRequest(url, fetchOptions, fetchFn);
}
__name(makeModelRequest, "makeModelRequest");
async function makeRequest(url, fetchOptions, fetchFn = fetch) {
  let response;
  try {
    response = await fetchFn(url, fetchOptions);
  } catch (e) {
    handleResponseError(e, url);
  }
  if (!response.ok) {
    await handleResponseNotOk(response, url);
  }
  return response;
}
__name(makeRequest, "makeRequest");
function handleResponseError(e, url) {
  let err = e;
  if (err.name === "AbortError") {
    err = new GoogleGenerativeAIAbortError(`Request aborted when fetching ${url.toString()}: ${e.message}`);
    err.stack = e.stack;
  } else if (!(e instanceof GoogleGenerativeAIFetchError || e instanceof GoogleGenerativeAIRequestInputError)) {
    err = new GoogleGenerativeAIError(`Error fetching from ${url.toString()}: ${e.message}`);
    err.stack = e.stack;
  }
  throw err;
}
__name(handleResponseError, "handleResponseError");
async function handleResponseNotOk(response, url) {
  let message = "";
  let errorDetails;
  try {
    const json = await response.json();
    message = json.error.message;
    if (json.error.details) {
      message += ` ${JSON.stringify(json.error.details)}`;
      errorDetails = json.error.details;
    }
  } catch (e) {
  }
  throw new GoogleGenerativeAIFetchError(`Error fetching from ${url.toString()}: [${response.status} ${response.statusText}] ${message}`, response.status, response.statusText, errorDetails);
}
__name(handleResponseNotOk, "handleResponseNotOk");
function buildFetchOptions(requestOptions) {
  const fetchOptions = {};
  if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.signal) !== void 0 || (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0) {
    const controller = new AbortController();
    if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0) {
      setTimeout(() => controller.abort(), requestOptions.timeout);
    }
    if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.signal) {
      requestOptions.signal.addEventListener("abort", () => {
        controller.abort();
      });
    }
    fetchOptions.signal = controller.signal;
  }
  return fetchOptions;
}
__name(buildFetchOptions, "buildFetchOptions");
function addHelpers(response) {
  response.text = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(`This response had ${response.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`);
      }
      if (hadBadFinishReason(response.candidates[0])) {
        throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
      }
      return getText(response);
    } else if (response.promptFeedback) {
      throw new GoogleGenerativeAIResponseError(`Text not available. ${formatBlockErrorMessage(response)}`, response);
    }
    return "";
  };
  response.functionCall = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(`This response had ${response.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`);
      }
      if (hadBadFinishReason(response.candidates[0])) {
        throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
      }
      console.warn(`response.functionCall() is deprecated. Use response.functionCalls() instead.`);
      return getFunctionCalls(response)[0];
    } else if (response.promptFeedback) {
      throw new GoogleGenerativeAIResponseError(`Function call not available. ${formatBlockErrorMessage(response)}`, response);
    }
    return void 0;
  };
  response.functionCalls = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(`This response had ${response.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`);
      }
      if (hadBadFinishReason(response.candidates[0])) {
        throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
      }
      return getFunctionCalls(response);
    } else if (response.promptFeedback) {
      throw new GoogleGenerativeAIResponseError(`Function call not available. ${formatBlockErrorMessage(response)}`, response);
    }
    return void 0;
  };
  return response;
}
__name(addHelpers, "addHelpers");
function getText(response) {
  var _a, _b, _c, _d;
  const textStrings = [];
  if ((_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) {
    for (const part of (_d = (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null || _d === void 0 ? void 0 : _d.parts) {
      if (part.text) {
        textStrings.push(part.text);
      }
      if (part.executableCode) {
        textStrings.push("\n```" + part.executableCode.language + "\n" + part.executableCode.code + "\n```\n");
      }
      if (part.codeExecutionResult) {
        textStrings.push("\n```\n" + part.codeExecutionResult.output + "\n```\n");
      }
    }
  }
  if (textStrings.length > 0) {
    return textStrings.join("");
  } else {
    return "";
  }
}
__name(getText, "getText");
function getFunctionCalls(response) {
  var _a, _b, _c, _d;
  const functionCalls = [];
  if ((_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) {
    for (const part of (_d = (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null || _d === void 0 ? void 0 : _d.parts) {
      if (part.functionCall) {
        functionCalls.push(part.functionCall);
      }
    }
  }
  if (functionCalls.length > 0) {
    return functionCalls;
  } else {
    return void 0;
  }
}
__name(getFunctionCalls, "getFunctionCalls");
var badFinishReasons = [
  FinishReason.RECITATION,
  FinishReason.SAFETY,
  FinishReason.LANGUAGE
];
function hadBadFinishReason(candidate) {
  return !!candidate.finishReason && badFinishReasons.includes(candidate.finishReason);
}
__name(hadBadFinishReason, "hadBadFinishReason");
function formatBlockErrorMessage(response) {
  var _a, _b, _c;
  let message = "";
  if ((!response.candidates || response.candidates.length === 0) && response.promptFeedback) {
    message += "Response was blocked";
    if ((_a = response.promptFeedback) === null || _a === void 0 ? void 0 : _a.blockReason) {
      message += ` due to ${response.promptFeedback.blockReason}`;
    }
    if ((_b = response.promptFeedback) === null || _b === void 0 ? void 0 : _b.blockReasonMessage) {
      message += `: ${response.promptFeedback.blockReasonMessage}`;
    }
  } else if ((_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0]) {
    const firstCandidate = response.candidates[0];
    if (hadBadFinishReason(firstCandidate)) {
      message += `Candidate was blocked due to ${firstCandidate.finishReason}`;
      if (firstCandidate.finishMessage) {
        message += `: ${firstCandidate.finishMessage}`;
      }
    }
  }
  return message;
}
__name(formatBlockErrorMessage, "formatBlockErrorMessage");
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
__name(__await, "__await");
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n])
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
  }
  __name(verb, "verb");
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  __name(resume, "resume");
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  __name(step, "step");
  function fulfill(value) {
    resume("next", value);
  }
  __name(fulfill, "fulfill");
  function reject(value) {
    resume("throw", value);
  }
  __name(reject, "reject");
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
  __name(settle, "settle");
}
__name(__asyncGenerator, "__asyncGenerator");
var responseLineRE = /^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;
function processStream(response) {
  const inputStream = response.body.pipeThrough(new TextDecoderStream("utf8", { fatal: true }));
  const responseStream = getResponseStream(inputStream);
  const [stream1, stream2] = responseStream.tee();
  return {
    stream: generateResponseSequence(stream1),
    response: getResponsePromise(stream2)
  };
}
__name(processStream, "processStream");
async function getResponsePromise(stream) {
  const allResponses = [];
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      return addHelpers(aggregateResponses(allResponses));
    }
    allResponses.push(value);
  }
}
__name(getResponsePromise, "getResponsePromise");
function generateResponseSequence(stream) {
  return __asyncGenerator(this, arguments, /* @__PURE__ */ __name(function* generateResponseSequence_1() {
    const reader = stream.getReader();
    while (true) {
      const { value, done } = yield __await(reader.read());
      if (done) {
        break;
      }
      yield yield __await(addHelpers(value));
    }
  }, "generateResponseSequence_1"));
}
__name(generateResponseSequence, "generateResponseSequence");
function getResponseStream(inputStream) {
  const reader = inputStream.getReader();
  const stream = new ReadableStream({
    start(controller) {
      let currentText = "";
      return pump();
      function pump() {
        return reader.read().then(({ value, done }) => {
          if (done) {
            if (currentText.trim()) {
              controller.error(new GoogleGenerativeAIError("Failed to parse stream"));
              return;
            }
            controller.close();
            return;
          }
          currentText += value;
          let match2 = currentText.match(responseLineRE);
          let parsedResponse;
          while (match2) {
            try {
              parsedResponse = JSON.parse(match2[1]);
            } catch (e) {
              controller.error(new GoogleGenerativeAIError(`Error parsing JSON response: "${match2[1]}"`));
              return;
            }
            controller.enqueue(parsedResponse);
            currentText = currentText.substring(match2[0].length);
            match2 = currentText.match(responseLineRE);
          }
          return pump();
        }).catch((e) => {
          let err = e;
          err.stack = e.stack;
          if (err.name === "AbortError") {
            err = new GoogleGenerativeAIAbortError("Request aborted when reading from the stream");
          } else {
            err = new GoogleGenerativeAIError("Error reading from the stream");
          }
          throw err;
        });
      }
      __name(pump, "pump");
    }
  });
  return stream;
}
__name(getResponseStream, "getResponseStream");
function aggregateResponses(responses) {
  const lastResponse = responses[responses.length - 1];
  const aggregatedResponse = {
    promptFeedback: lastResponse === null || lastResponse === void 0 ? void 0 : lastResponse.promptFeedback
  };
  for (const response of responses) {
    if (response.candidates) {
      let candidateIndex = 0;
      for (const candidate of response.candidates) {
        if (!aggregatedResponse.candidates) {
          aggregatedResponse.candidates = [];
        }
        if (!aggregatedResponse.candidates[candidateIndex]) {
          aggregatedResponse.candidates[candidateIndex] = {
            index: candidateIndex
          };
        }
        aggregatedResponse.candidates[candidateIndex].citationMetadata = candidate.citationMetadata;
        aggregatedResponse.candidates[candidateIndex].groundingMetadata = candidate.groundingMetadata;
        aggregatedResponse.candidates[candidateIndex].finishReason = candidate.finishReason;
        aggregatedResponse.candidates[candidateIndex].finishMessage = candidate.finishMessage;
        aggregatedResponse.candidates[candidateIndex].safetyRatings = candidate.safetyRatings;
        if (candidate.content && candidate.content.parts) {
          if (!aggregatedResponse.candidates[candidateIndex].content) {
            aggregatedResponse.candidates[candidateIndex].content = {
              role: candidate.content.role || "user",
              parts: []
            };
          }
          const newPart = {};
          for (const part of candidate.content.parts) {
            if (part.text) {
              newPart.text = part.text;
            }
            if (part.functionCall) {
              newPart.functionCall = part.functionCall;
            }
            if (part.executableCode) {
              newPart.executableCode = part.executableCode;
            }
            if (part.codeExecutionResult) {
              newPart.codeExecutionResult = part.codeExecutionResult;
            }
            if (Object.keys(newPart).length === 0) {
              newPart.text = "";
            }
            aggregatedResponse.candidates[candidateIndex].content.parts.push(newPart);
          }
        }
      }
      candidateIndex++;
    }
    if (response.usageMetadata) {
      aggregatedResponse.usageMetadata = response.usageMetadata;
    }
  }
  return aggregatedResponse;
}
__name(aggregateResponses, "aggregateResponses");
async function generateContentStream(apiKey, model, params, requestOptions) {
  const response = await makeModelRequest(
    model,
    Task.STREAM_GENERATE_CONTENT,
    apiKey,
    /* stream */
    true,
    JSON.stringify(params),
    requestOptions
  );
  return processStream(response);
}
__name(generateContentStream, "generateContentStream");
async function generateContent(apiKey, model, params, requestOptions) {
  const response = await makeModelRequest(
    model,
    Task.GENERATE_CONTENT,
    apiKey,
    /* stream */
    false,
    JSON.stringify(params),
    requestOptions
  );
  const responseJson = await response.json();
  const enhancedResponse = addHelpers(responseJson);
  return {
    response: enhancedResponse
  };
}
__name(generateContent, "generateContent");
function formatSystemInstruction(input) {
  if (input == null) {
    return void 0;
  } else if (typeof input === "string") {
    return { role: "system", parts: [{ text: input }] };
  } else if (input.text) {
    return { role: "system", parts: [input] };
  } else if (input.parts) {
    if (!input.role) {
      return { role: "system", parts: input.parts };
    } else {
      return input;
    }
  }
}
__name(formatSystemInstruction, "formatSystemInstruction");
function formatNewContent(request) {
  let newParts = [];
  if (typeof request === "string") {
    newParts = [{ text: request }];
  } else {
    for (const partOrString of request) {
      if (typeof partOrString === "string") {
        newParts.push({ text: partOrString });
      } else {
        newParts.push(partOrString);
      }
    }
  }
  return assignRoleToPartsAndValidateSendMessageRequest(newParts);
}
__name(formatNewContent, "formatNewContent");
function assignRoleToPartsAndValidateSendMessageRequest(parts) {
  const userContent = { role: "user", parts: [] };
  const functionContent = { role: "function", parts: [] };
  let hasUserContent = false;
  let hasFunctionContent = false;
  for (const part of parts) {
    if ("functionResponse" in part) {
      functionContent.parts.push(part);
      hasFunctionContent = true;
    } else {
      userContent.parts.push(part);
      hasUserContent = true;
    }
  }
  if (hasUserContent && hasFunctionContent) {
    throw new GoogleGenerativeAIError("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");
  }
  if (!hasUserContent && !hasFunctionContent) {
    throw new GoogleGenerativeAIError("No content is provided for sending chat message.");
  }
  if (hasUserContent) {
    return userContent;
  }
  return functionContent;
}
__name(assignRoleToPartsAndValidateSendMessageRequest, "assignRoleToPartsAndValidateSendMessageRequest");
function formatCountTokensInput(params, modelParams) {
  var _a;
  let formattedGenerateContentRequest = {
    model: modelParams === null || modelParams === void 0 ? void 0 : modelParams.model,
    generationConfig: modelParams === null || modelParams === void 0 ? void 0 : modelParams.generationConfig,
    safetySettings: modelParams === null || modelParams === void 0 ? void 0 : modelParams.safetySettings,
    tools: modelParams === null || modelParams === void 0 ? void 0 : modelParams.tools,
    toolConfig: modelParams === null || modelParams === void 0 ? void 0 : modelParams.toolConfig,
    systemInstruction: modelParams === null || modelParams === void 0 ? void 0 : modelParams.systemInstruction,
    cachedContent: (_a = modelParams === null || modelParams === void 0 ? void 0 : modelParams.cachedContent) === null || _a === void 0 ? void 0 : _a.name,
    contents: []
  };
  const containsGenerateContentRequest = params.generateContentRequest != null;
  if (params.contents) {
    if (containsGenerateContentRequest) {
      throw new GoogleGenerativeAIRequestInputError("CountTokensRequest must have one of contents or generateContentRequest, not both.");
    }
    formattedGenerateContentRequest.contents = params.contents;
  } else if (containsGenerateContentRequest) {
    formattedGenerateContentRequest = Object.assign(Object.assign({}, formattedGenerateContentRequest), params.generateContentRequest);
  } else {
    const content = formatNewContent(params);
    formattedGenerateContentRequest.contents = [content];
  }
  return { generateContentRequest: formattedGenerateContentRequest };
}
__name(formatCountTokensInput, "formatCountTokensInput");
function formatGenerateContentInput(params) {
  let formattedRequest;
  if (params.contents) {
    formattedRequest = params;
  } else {
    const content = formatNewContent(params);
    formattedRequest = { contents: [content] };
  }
  if (params.systemInstruction) {
    formattedRequest.systemInstruction = formatSystemInstruction(params.systemInstruction);
  }
  return formattedRequest;
}
__name(formatGenerateContentInput, "formatGenerateContentInput");
function formatEmbedContentInput(params) {
  if (typeof params === "string" || Array.isArray(params)) {
    const content = formatNewContent(params);
    return { content };
  }
  return params;
}
__name(formatEmbedContentInput, "formatEmbedContentInput");
var VALID_PART_FIELDS = [
  "text",
  "inlineData",
  "functionCall",
  "functionResponse",
  "executableCode",
  "codeExecutionResult"
];
var VALID_PARTS_PER_ROLE = {
  user: ["text", "inlineData"],
  function: ["functionResponse"],
  model: ["text", "functionCall", "executableCode", "codeExecutionResult"],
  // System instructions shouldn't be in history anyway.
  system: ["text"]
};
function validateChatHistory(history) {
  let prevContent = false;
  for (const currContent of history) {
    const { role, parts } = currContent;
    if (!prevContent && role !== "user") {
      throw new GoogleGenerativeAIError(`First content should be with role 'user', got ${role}`);
    }
    if (!POSSIBLE_ROLES.includes(role)) {
      throw new GoogleGenerativeAIError(`Each item should include role field. Got ${role} but valid roles are: ${JSON.stringify(POSSIBLE_ROLES)}`);
    }
    if (!Array.isArray(parts)) {
      throw new GoogleGenerativeAIError("Content should have 'parts' property with an array of Parts");
    }
    if (parts.length === 0) {
      throw new GoogleGenerativeAIError("Each Content should have at least one part");
    }
    const countFields = {
      text: 0,
      inlineData: 0,
      functionCall: 0,
      functionResponse: 0,
      fileData: 0,
      executableCode: 0,
      codeExecutionResult: 0
    };
    for (const part of parts) {
      for (const key of VALID_PART_FIELDS) {
        if (key in part) {
          countFields[key] += 1;
        }
      }
    }
    const validParts = VALID_PARTS_PER_ROLE[role];
    for (const key of VALID_PART_FIELDS) {
      if (!validParts.includes(key) && countFields[key] > 0) {
        throw new GoogleGenerativeAIError(`Content with role '${role}' can't contain '${key}' part`);
      }
    }
    prevContent = true;
  }
}
__name(validateChatHistory, "validateChatHistory");
function isValidResponse(response) {
  var _a;
  if (response.candidates === void 0 || response.candidates.length === 0) {
    return false;
  }
  const content = (_a = response.candidates[0]) === null || _a === void 0 ? void 0 : _a.content;
  if (content === void 0) {
    return false;
  }
  if (content.parts === void 0 || content.parts.length === 0) {
    return false;
  }
  for (const part of content.parts) {
    if (part === void 0 || Object.keys(part).length === 0) {
      return false;
    }
    if (part.text !== void 0 && part.text === "") {
      return false;
    }
  }
  return true;
}
__name(isValidResponse, "isValidResponse");
var SILENT_ERROR = "SILENT_ERROR";
var ChatSession = class {
  constructor(apiKey, model, params, _requestOptions = {}) {
    this.model = model;
    this.params = params;
    this._requestOptions = _requestOptions;
    this._history = [];
    this._sendPromise = Promise.resolve();
    this._apiKey = apiKey;
    if (params === null || params === void 0 ? void 0 : params.history) {
      validateChatHistory(params.history);
      this._history = params.history;
    }
  }
  /**
   * Gets the chat history so far. Blocked prompts are not added to history.
   * Blocked candidates are not added to history, nor are the prompts that
   * generated them.
   */
  async getHistory() {
    await this._sendPromise;
    return this._history;
  }
  /**
   * Sends a chat message and receives a non-streaming
   * {@link GenerateContentResult}.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async sendMessage(request, requestOptions = {}) {
    var _a, _b, _c, _d, _e, _f;
    await this._sendPromise;
    const newContent = formatNewContent(request);
    const generateContentRequest = {
      safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
      generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
      tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
      toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
      systemInstruction: (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
      cachedContent: (_f = this.params) === null || _f === void 0 ? void 0 : _f.cachedContent,
      contents: [...this._history, newContent]
    };
    const chatSessionRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    let finalResult;
    this._sendPromise = this._sendPromise.then(() => generateContent(this._apiKey, this.model, generateContentRequest, chatSessionRequestOptions)).then((result) => {
      var _a2;
      if (isValidResponse(result.response)) {
        this._history.push(newContent);
        const responseContent = Object.assign({
          parts: [],
          // Response seems to come back without a role set.
          role: "model"
        }, (_a2 = result.response.candidates) === null || _a2 === void 0 ? void 0 : _a2[0].content);
        this._history.push(responseContent);
      } else {
        const blockErrorMessage = formatBlockErrorMessage(result.response);
        if (blockErrorMessage) {
          console.warn(`sendMessage() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
        }
      }
      finalResult = result;
    }).catch((e) => {
      this._sendPromise = Promise.resolve();
      throw e;
    });
    await this._sendPromise;
    return finalResult;
  }
  /**
   * Sends a chat message and receives the response as a
   * {@link GenerateContentStreamResult} containing an iterable stream
   * and a response promise.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async sendMessageStream(request, requestOptions = {}) {
    var _a, _b, _c, _d, _e, _f;
    await this._sendPromise;
    const newContent = formatNewContent(request);
    const generateContentRequest = {
      safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
      generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
      tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
      toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
      systemInstruction: (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
      cachedContent: (_f = this.params) === null || _f === void 0 ? void 0 : _f.cachedContent,
      contents: [...this._history, newContent]
    };
    const chatSessionRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    const streamPromise = generateContentStream(this._apiKey, this.model, generateContentRequest, chatSessionRequestOptions);
    this._sendPromise = this._sendPromise.then(() => streamPromise).catch((_ignored) => {
      throw new Error(SILENT_ERROR);
    }).then((streamResult) => streamResult.response).then((response) => {
      if (isValidResponse(response)) {
        this._history.push(newContent);
        const responseContent = Object.assign({}, response.candidates[0].content);
        if (!responseContent.role) {
          responseContent.role = "model";
        }
        this._history.push(responseContent);
      } else {
        const blockErrorMessage = formatBlockErrorMessage(response);
        if (blockErrorMessage) {
          console.warn(`sendMessageStream() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
        }
      }
    }).catch((e) => {
      if (e.message !== SILENT_ERROR) {
        console.error(e);
      }
    });
    return streamPromise;
  }
};
__name(ChatSession, "ChatSession");
async function countTokens(apiKey, model, params, singleRequestOptions) {
  const response = await makeModelRequest(model, Task.COUNT_TOKENS, apiKey, false, JSON.stringify(params), singleRequestOptions);
  return response.json();
}
__name(countTokens, "countTokens");
async function embedContent(apiKey, model, params, requestOptions) {
  const response = await makeModelRequest(model, Task.EMBED_CONTENT, apiKey, false, JSON.stringify(params), requestOptions);
  return response.json();
}
__name(embedContent, "embedContent");
async function batchEmbedContents(apiKey, model, params, requestOptions) {
  const requestsWithModel = params.requests.map((request) => {
    return Object.assign(Object.assign({}, request), { model });
  });
  const response = await makeModelRequest(model, Task.BATCH_EMBED_CONTENTS, apiKey, false, JSON.stringify({ requests: requestsWithModel }), requestOptions);
  return response.json();
}
__name(batchEmbedContents, "batchEmbedContents");
var GenerativeModel = class {
  constructor(apiKey, modelParams, _requestOptions = {}) {
    this.apiKey = apiKey;
    this._requestOptions = _requestOptions;
    if (modelParams.model.includes("/")) {
      this.model = modelParams.model;
    } else {
      this.model = `models/${modelParams.model}`;
    }
    this.generationConfig = modelParams.generationConfig || {};
    this.safetySettings = modelParams.safetySettings || [];
    this.tools = modelParams.tools;
    this.toolConfig = modelParams.toolConfig;
    this.systemInstruction = formatSystemInstruction(modelParams.systemInstruction);
    this.cachedContent = modelParams.cachedContent;
  }
  /**
   * Makes a single non-streaming call to the model
   * and returns an object containing a single {@link GenerateContentResponse}.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async generateContent(request, requestOptions = {}) {
    var _a;
    const formattedParams = formatGenerateContentInput(request);
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return generateContent(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, formattedParams), generativeModelRequestOptions);
  }
  /**
   * Makes a single streaming call to the model and returns an object
   * containing an iterable stream that iterates over all chunks in the
   * streaming response as well as a promise that returns the final
   * aggregated response.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async generateContentStream(request, requestOptions = {}) {
    var _a;
    const formattedParams = formatGenerateContentInput(request);
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return generateContentStream(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, formattedParams), generativeModelRequestOptions);
  }
  /**
   * Gets a new {@link ChatSession} instance which can be used for
   * multi-turn chats.
   */
  startChat(startChatParams) {
    var _a;
    return new ChatSession(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, startChatParams), this._requestOptions);
  }
  /**
   * Counts the tokens in the provided request.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async countTokens(request, requestOptions = {}) {
    const formattedParams = formatCountTokensInput(request, {
      model: this.model,
      generationConfig: this.generationConfig,
      safetySettings: this.safetySettings,
      tools: this.tools,
      toolConfig: this.toolConfig,
      systemInstruction: this.systemInstruction,
      cachedContent: this.cachedContent
    });
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return countTokens(this.apiKey, this.model, formattedParams, generativeModelRequestOptions);
  }
  /**
   * Embeds the provided content.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async embedContent(request, requestOptions = {}) {
    const formattedParams = formatEmbedContentInput(request);
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return embedContent(this.apiKey, this.model, formattedParams, generativeModelRequestOptions);
  }
  /**
   * Embeds an array of {@link EmbedContentRequest}s.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async batchEmbedContents(batchEmbedContentRequest, requestOptions = {}) {
    const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
    return batchEmbedContents(this.apiKey, this.model, batchEmbedContentRequest, generativeModelRequestOptions);
  }
};
__name(GenerativeModel, "GenerativeModel");
var GoogleGenerativeAI = class {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  /**
   * Gets a {@link GenerativeModel} instance for the provided model name.
   */
  getGenerativeModel(modelParams, requestOptions) {
    if (!modelParams.model) {
      throw new GoogleGenerativeAIError(`Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })`);
    }
    return new GenerativeModel(this.apiKey, modelParams, requestOptions);
  }
  /**
   * Creates a {@link GenerativeModel} instance from provided content cache.
   */
  getGenerativeModelFromCachedContent(cachedContent, modelParams, requestOptions) {
    if (!cachedContent.name) {
      throw new GoogleGenerativeAIRequestInputError("Cached content must contain a `name` field.");
    }
    if (!cachedContent.model) {
      throw new GoogleGenerativeAIRequestInputError("Cached content must contain a `model` field.");
    }
    const disallowedDuplicates = ["model", "systemInstruction"];
    for (const key of disallowedDuplicates) {
      if ((modelParams === null || modelParams === void 0 ? void 0 : modelParams[key]) && cachedContent[key] && (modelParams === null || modelParams === void 0 ? void 0 : modelParams[key]) !== cachedContent[key]) {
        if (key === "model") {
          const modelParamsComp = modelParams.model.startsWith("models/") ? modelParams.model.replace("models/", "") : modelParams.model;
          const cachedContentComp = cachedContent.model.startsWith("models/") ? cachedContent.model.replace("models/", "") : cachedContent.model;
          if (modelParamsComp === cachedContentComp) {
            continue;
          }
        }
        throw new GoogleGenerativeAIRequestInputError(`Different value for "${key}" specified in modelParams (${modelParams[key]}) and cachedContent (${cachedContent[key]})`);
      }
    }
    const modelParamsFromCache = Object.assign(Object.assign({}, modelParams), { model: cachedContent.model, tools: cachedContent.tools, toolConfig: cachedContent.toolConfig, systemInstruction: cachedContent.systemInstruction, cachedContent });
    return new GenerativeModel(this.apiKey, modelParamsFromCache, requestOptions);
  }
};
__name(GoogleGenerativeAI, "GoogleGenerativeAI");

// src/i18n.ts
var DEFAULT_LANG = "en";
function isLang(v) {
  return v === "en" || v === "fr" || v === "ar";
}
__name(isLang, "isLang");
var LANG_META = {
  en: { label: "EN", dir: "ltr", name: "English" },
  fr: { label: "FR", dir: "ltr", name: "Fran\xE7ais" },
  ar: { label: "\u0639\u0631\u0628\u064A", dir: "rtl", name: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" }
};
var dicts = {
  en: {
    nav: { services: "Services", sovereign: "Sovereign AI", claw: "Watcher Claw", chat: "AI Sales Agent", research: "Research", contact: "Contact", register: "Get started" },
    hero: {
      eyebrow: "Watcher IA \xB7 AI agents that work",
      titleA: "BUILD YOUR BUSINESS WITH",
      titleB: "AGENTIC AI",
      subtitle: "Automation \xB7 AI Agents \xB7 Digital Workforce. Autonomous workforces for admin, accounting & dev \u2014 deployed on your sovereign infrastructure.",
      ctaPrimary: "Deploy AI agents",
      ctaSecondary: "Explore services",
      badges: ["Enterprise Automation", "Multi-Agent Systems", "AI Workflows", "RAG Architecture", "MCP Integration", "AI Assistants", "Business Automation", "Custom AI Solutions"]
    },
    strip: ["Automate everything", "Scale without limits", "Deploy AI agents. Grow faster."],
    claw: {
      eyebrow: "Watcher Claw Platform",
      title: "An AI Agent That Learns & Executes",
      subtitle: "Watcher Claw transitions manual execution into autonomous mastery for operational ROI. Deploy agents that observe your workflows, learn SOPs, and execute with precision guardrails.",
      stats: [
        { label: "Agent Efficiency", value: "99.8%" },
        { label: "Tasks Automated", value: "1,245,000+" },
        { label: "Connectivity Status", value: "Secure (12 Nodes)" }
      ],
      cta: "Experience Mastery"
    },
    services: {
      eyebrow: "What we do",
      title: "Bespoke agentic solutions, wired into your operations",
      subtitle: "Outcome-based automation \u2014 measured by ROI, not demos.",
      items: [
        { key: "agentic_solutions", title: "Bespoke Agentic Solutions", desc: "Autonomous workforces for administrative, accounting & dev teams. Agents that learn your SOPs and execute.", tag: "Admin \xB7 Accounting \xB7 Dev" },
        { key: "n8n_automation", title: "n8n Workflow Automation & Training", desc: "Enterprise-grade pipeline orchestration with n8n. We build, harden, and train your team to own it.", tag: "n8n \xB7 Pipelines \xB7 Training" },
        { key: "private_ai_server", title: "Secure Private AI Server Deployment", desc: "On-premise / sovereign deployment powered by ODS / Osmantic stack. Your data never leaves your perimeter.", tag: "On-premise \xB7 Sovereign \xB7 ODS" },
        { key: "consulting_governance", title: "Consulting & Digital Governance", desc: "Strategic AI advisory, governance frameworks, and AGI-readiness roadmaps for executives.", tag: "Strategy \xB7 Governance" }
      ]
    },
    sovereign: {
      eyebrow: "Sovereign by design",
      title: "Stop managing tools. Deploy agents that learn.",
      desc: "Watcher Claw transitions manual execution into autonomous mastery for operational ROI \u2014 inside your private cloud.",
      bullets: ["ODS / Osmantic private stack", "RAG over your internal knowledge", "MCP integrations to your ERP / CRM", "Audit trails & human-in-the-loop guardrails"],
      cta: "Talk to an architect"
    },
    governance: {
      eyebrow: "Digital Sovereignty & Ethics",
      title: "Artificial Intelligence at the Service of Humanity",
      subtitle: "Building a trustworthy future with clear rules and absolute transparency.",
      items: [
        { title: "Governance", desc: "Clear rules and assumed responsibilities across all autonomous workflows." },
        { title: "Transparency", desc: "A system that explains every decision, never guessing." },
        { title: "Responsibility", desc: "Humans remain at the core of all strategic decisions." },
        { title: "Responsible Design", desc: "Technology dedicated to human dignity and operational excellence." }
      ]
    },
    chatSection: {
      eyebrow: "Interactive Advisory",
      title: "Talk with Watcher AI Sales Agent",
      subtitle: "Ask about our autonomous workforces, sovereign infrastructure, or custom enterprise architecture.",
      placeholder: "Type your inquiry regarding Watcher IA agents...",
      send: "Transmit Query",
      initial: "Greetings. I am the Watcher AI Sales Agent. How may I assist your enterprise in deploying autonomous workflows today?"
    },
    research: { eyebrow: "Research & notes", title: "From the lab", subtitle: "Operational playbooks on agentic automation.", readMore: "Read note" },
    register: {
      title: "Client registration",
      subtitle: "Tell us about your use case. We reply within 1 business day and sync directly to our orchestration pipeline.",
      name: "Full name",
      company: "Company",
      email: "Work email",
      service: "Service request",
      message: "Briefly describe your need",
      services: [
        { value: "agentic_solutions", label: "Bespoke Agentic Solutions" },
        { value: "n8n_automation", label: "n8n Workflow Automation & Training" },
        { value: "private_ai_server", label: "Secure Private AI Server (ODS/Osmantic)" },
        { value: "consulting_governance", label: "Consulting & Digital Governance" },
        { value: "other", label: "Other" }
      ],
      submit: "Submit request",
      success: "Request received and transmitted to orchestration pipeline. Our team will contact you shortly.",
      error: "Submission failed. Check fields and retry.",
      optional: "optional"
    },
    footer: { tagline: "AI agents that work. Automate everything. Scale without limits.", rights: "All rights reserved.", contact: "Contact", emailLabel: "Email", phoneLabel: "Phone", addressLabel: "Headquarters" }
  },
  fr: {
    nav: { services: "Services", sovereign: "IA souveraine", claw: "Watcher Claw", chat: "Agent IA", research: "Recherche", contact: "Contact", register: "D\xE9marrer" },
    hero: {
      eyebrow: "Watcher IA \xB7 des agents IA qui travaillent",
      titleA: "D\xC9VELOPPEZ VOTRE ENTREPRISE AVEC",
      titleB: "L'IA AGENTIQUE",
      subtitle: "Automatisation \xB7 Agents IA \xB7 Workforce digitale. Des workforces autonomes pour l\u2019admin, la compta & le dev \u2014 d\xE9ploy\xE9es sur votre infra souveraine.",
      ctaPrimary: "D\xE9ployer des agents IA",
      ctaSecondary: "Explorer les services",
      badges: ["Automatisation entreprise", "Syst\xE8mes multi-agents", "Workflows IA", "Architecture RAG", "Int\xE9gration MCP", "Assistants IA", "Automatisation business", "Solutions IA sur mesure"]
    },
    strip: ["Automatisez tout", "Scalez sans limites", "D\xE9ployez des agents IA. Grandissez plus vite."],
    claw: {
      eyebrow: "Plateforme Watcher Claw",
      title: "Un agent IA qui apprend et s'ex\xE9cute",
      subtitle: "Watcher Claw fait passer l'ex\xE9cution manuelle \xE0 la ma\xEEtrise autonome pour un ROI op\xE9rationnel. D\xE9ployez des agents qui observent vos flux, apprennent vos SOP et ex\xE9cutent avec pr\xE9cision.",
      stats: [
        { label: "Efficacit\xE9 de l'agent", value: "99.8%" },
        { label: "T\xE2ches automatis\xE9es", value: "1 245 000+" },
        { label: "Statut de connectivit\xE9", value: "S\xE9curis\xE9 (12 n\u0153uds)" }
      ],
      cta: "Exp\xE9rimenter la ma\xEEtrise"
    },
    services: {
      eyebrow: "Ce que nous faisons",
      title: "Des solutions agentiques sur mesure, c\xE2bl\xE9es \xE0 vos op\xE9rations",
      subtitle: "Une automatisation orient\xE9e r\xE9sultats \u2014 mesur\xE9e au ROI, pas aux d\xE9mos.",
      items: [
        { key: "agentic_solutions", title: "Solutions agentiques sur mesure", desc: "Workforces autonomes pour \xE9quipes administratives, comptables & dev. Des agents qui apprennent vos SOP et ex\xE9cutent.", tag: "Admin \xB7 Compta \xB7 Dev" },
        { key: "n8n_automation", title: "Automatisation n8n & formation", desc: "Orchestration de pipelines robuste avec n8n. Nous construisons, durcissons et formons vos \xE9quipes.", tag: "n8n \xB7 Pipelines \xB7 Formation" },
        { key: "private_ai_server", title: "Serveur IA priv\xE9 s\xE9curis\xE9", desc: "D\xE9ploiement on-premise / souverain propuls\xE9 par la stack ODS / Osmantic. Vos donn\xE9es restent chez vous.", tag: "On-premise \xB7 Souverain \xB7 ODS" },
        { key: "consulting_governance", title: "Conseil & gouvernance digitale", desc: "Conseil strat\xE9gique IA, cadres de gouvernance et feuilles de route AGI pour dirigeants.", tag: "Strat\xE9gie \xB7 Gouvernance" }
      ]
    },
    sovereign: {
      eyebrow: "Souverain par design",
      title: "Cessez de g\xE9rer des outils. D\xE9ployez des agents qui apprennent.",
      desc: "Watcher Claw fait passer l\u2019ex\xE9cution manuelle \xE0 la ma\xEEtrise autonome pour un ROI op\xE9rationnel \u2014 dans votre cloud priv\xE9.",
      bullets: ["Stack priv\xE9e ODS / Osmantic", "RAG sur votre connaissance interne", "Int\xE9grations MCP \xE0 votre ERP / CRM", "Pistes d\u2019audit & garde-fous humains"],
      cta: "Parler \xE0 un architecte"
    },
    governance: {
      eyebrow: "Souverainet\xE9 Num\xE9rique & IA",
      title: "L'Intelligence Artificielle au Service de l'Humain",
      subtitle: "Construisons un avenir de confiance, ensemble, avec des r\xE8gles claires et une transparence absolue.",
      items: [
        { title: "Gouvernance", desc: "Des r\xE8gles claires, des responsabilit\xE9s assum\xE9es \xE0 chaque \xE9tape." },
        { title: "Transparence", desc: "Un syst\xE8me qui explique, pas qui devine." },
        { title: "Responsabilit\xE9", desc: "L\u2019humain reste au c\u0153ur de toutes les d\xE9cisions strat\xE9giques." },
        { title: "Conception Responsable", desc: "La technologie au service de la dignit\xE9 humaine." }
      ]
    },
    chatSection: {
      eyebrow: "Conseil Interactif",
      title: "\xC9changez avec l\u2019Agent Commercial Watcher IA",
      subtitle: "Interrogez notre syst\xE8me sur nos workforces autonomes, notre infrastructure souveraine ou notre architecture sur mesure.",
      placeholder: "Tapez votre question concernant les agents Watcher IA...",
      send: "Transmettre",
      initial: "Salutations. Je suis l\u2019agent commercial Watcher IA. Comment puis-je assister votre entreprise dans le d\xE9ploiement de flux autonomes aujourd\u2019hui ?"
    },
    research: { eyebrow: "Recherche & notes", title: "Depuis le labo", subtitle: "Playbooks op\xE9rationnels sur l\u2019automatisation agentique.", readMore: "Lire la note" },
    register: {
      title: "Inscription client",
      subtitle: "D\xE9crivez votre besoin. R\xE9ponse sous 1 jour ouvr\xE9 et synchronisation directe avec notre pipeline d\u2019orchestration.",
      name: "Nom complet",
      company: "Soci\xE9t\xE9",
      email: "Email pro",
      service: "Service demand\xE9",
      message: "D\xE9crivez bri\xE8vement votre besoin",
      services: [
        { value: "agentic_solutions", label: "Solutions agentiques sur mesure" },
        { value: "n8n_automation", label: "Automatisation n8n & formation" },
        { value: "private_ai_server", label: "Serveur IA priv\xE9 (ODS/Osmantic)" },
        { value: "consulting_governance", label: "Conseil & gouvernance digitale" },
        { value: "other", label: "Autre" }
      ],
      submit: "Envoyer la demande",
      success: "Demande re\xE7ue et transmise au pipeline d\u2019orchestration. Notre \xE9quipe vous contactera rapidement.",
      error: "\xC9chec d\u2019envoi. V\xE9rifiez les champs et r\xE9essayez.",
      optional: "optionnel"
    },
    footer: { tagline: "Des agents IA qui travaillent. Automatisez tout. Scalez sans limites.", rights: "Tous droits r\xE9serv\xE9s.", contact: "Contact", emailLabel: "Email", phoneLabel: "T\xE9l\xE9phone", addressLabel: "Si\xE8ge social" }
  },
  ar: {
    nav: { services: "\u0627\u0644\u062E\u062F\u0645\u0627\u062A", sovereign: "\u0630\u0643\u0627\u0621 \u0633\u064A\u0627\u062F\u064A", claw: "\u0648\u0627\u062A\u0634\u0631 \u0643\u0644\u0648", chat: "\u0645\u0633\u062A\u0634\u0627\u0631 \u0627\u0644\u0630\u0643\u0627\u0621", research: "\u0627\u0644\u0623\u0628\u062D\u0627\u062B", contact: "\u0627\u062A\u0635\u0644 \u0628\u0646\u0627", register: "\u0627\u0628\u062F\u0623 \u0627\u0644\u0622\u0646" },
    hero: {
      eyebrow: "\u0648\u0627\u062A\u0634\u0631 IA \xB7 \u0648\u0643\u0644\u0627\u0621 \u0630\u0643\u0627\u0621 \u064A\u0639\u0645\u0644\u0648\u0646 \u0641\u0639\u0644\u0627\u064B",
      titleA: "\u0637\u0648\u0651\u0631 \u0623\u0639\u0645\u0627\u0644\u0643 \u0645\u0639",
      titleB: "\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0648\u0643\u064A\u0644\u064A",
      subtitle: "\u0623\u062A\u0645\u062A\u0629 \xB7 \u0648\u0643\u0644\u0627\u0621 \u0630\u0643\u0627\u0621 \xB7 \u0642\u0648\u0649 \u0639\u0627\u0645\u0644\u0629 \u0631\u0642\u0645\u064A\u0629. \u0642\u0648\u0649 \u0639\u0627\u0645\u0644\u0629 \u0630\u0627\u062A\u064A\u0629 \u0644\u0644\u0625\u062F\u0627\u0631\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0633\u0628\u0629 \u0648\u0627\u0644\u062A\u0637\u0648\u064A\u0631 \u2014 \u0645\u0646\u0634\u0648\u0631\u0629 \u0639\u0644\u0649 \u0628\u0646\u064A\u062A\u0643 \u0627\u0644\u0633\u064A\u0627\u062F\u064A\u0629.",
      ctaPrimary: "\u0627\u0646\u0634\u0631 \u0648\u0643\u0644\u0627\u0621 \u0627\u0644\u0630\u0643\u0627\u0621",
      ctaSecondary: "\u0627\u0633\u062A\u0643\u0634\u0641 \u0627\u0644\u062E\u062F\u0645\u0627\u062A",
      badges: ["\u0623\u062A\u0645\u062A\u0629 \u0627\u0644\u0645\u0624\u0633\u0633\u0627\u062A", "\u0623\u0646\u0638\u0645\u0629 \u0645\u062A\u0639\u062F\u062F\u0629 \u0627\u0644\u0648\u0643\u0644\u0627\u0621", "\u0633\u064A\u0631 \u0639\u0645\u0644 \u0630\u0643\u064A", "\u0628\u0646\u064A\u0629 RAG", "\u062A\u0643\u0627\u0645\u0644 MCP", "\u0645\u0633\u0627\u0639\u062F\u0627\u062A \u0630\u0643\u064A\u0629", "\u0623\u062A\u0645\u062A\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644", "\u062D\u0644\u0648\u0644 \u0630\u0643\u0627\u0621 \u0645\u062E\u0635\u0635\u0629"]
    },
    strip: ["\u0623\u062A\u0645\u062A \u0643\u0644 \u0634\u064A\u0621", "\u062A\u0648\u0633\u0651\u0639 \u0628\u0644\u0627 \u062D\u062F\u0648\u062F", "\u0627\u0646\u0634\u0631 \u0648\u0643\u0644\u0627\u0621 \u0627\u0644\u0630\u0643\u0627\u0621. \u0627\u0646\u0645\u064F \u0623\u0633\u0631\u0639."],
    claw: {
      eyebrow: "\u0645\u0646\u0635\u0629 Watcher Claw",
      title: "\u0648\u0643\u064A\u0644 \u0630\u0643\u0627\u0621 \u0627\u0635\u0637\u0646\u0627\u0639\u064A \u064A\u062A\u0639\u0644\u0645 \u0648\u064A\u0646\u0641\u0630",
      subtitle: "\u064A\u062D\u0648\u0651\u0644 Watcher Claw \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u064A\u062F\u0648\u064A \u0625\u0644\u0649 \u0625\u062A\u0642\u0627\u0646 \u0630\u0627\u062A\u064A \u0645\u0646 \u0623\u062C\u0644 \u0639\u0627\u0626\u062F \u062A\u0634\u063A\u064A\u0644\u064A. \u0627\u0646\u0634\u0631 \u0648\u0643\u0644\u0627\u0621 \u064A\u0631\u0627\u0642\u0628\u0648\u0646 \u062A\u062F\u0641\u0642\u0627\u062A \u0639\u0645\u0644\u0643\u060C \u064A\u062A\u0639\u0644\u0645\u0648\u0646 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A\u060C \u0648\u064A\u0646\u0641\u0630\u0648\u0646 \u0628\u062F\u0642\u0629 \u0639\u0627\u0644\u064A\u0629.",
      stats: [
        { label: "\u0643\u0641\u0627\u0621\u0629 \u0627\u0644\u0648\u0643\u064A\u0644", value: "99.8%" },
        { label: "\u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u0645\u0624\u062A\u0645\u062A\u0629", value: "+1,245,000" },
        { label: "\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u062A\u0635\u0627\u0644", value: "\u0622\u0645\u0646 (12 \u0639\u0642\u062F\u0629)" }
      ],
      cta: "\u0627\u062E\u062A\u0628\u0631 \u0627\u0644\u0625\u062A\u0642\u0627\u0646 \u0627\u0644\u0630\u0627\u062A\u064A"
    },
    services: {
      eyebrow: "\u0645\u0627\u0630\u0627 \u0646\u0642\u062F\u0645",
      title: "\u062D\u0644\u0648\u0644 \u0648\u0643\u064A\u0644\u064A\u0629 \u0645\u0635\u0645\u0645\u0629 \u062E\u0635\u064A\u0635\u0627\u064B\u060C \u0645\u062F\u0645\u062C\u0629 \u0641\u064A \u0639\u0645\u0644\u064A\u0627\u062A\u0643",
      subtitle: "\u0623\u062A\u0645\u062A\u0629 \u0642\u0627\u0626\u0645\u0629 \u0639\u0644\u0649 \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u2014 \u062A\u064F\u0642\u0627\u0633 \u0628\u0627\u0644\u0639\u0627\u0626\u062F \u0644\u0627 \u0628\u0627\u0644\u0639\u0631\u0648\u0636.",
      items: [
        { key: "agentic_solutions", title: "\u062D\u0644\u0648\u0644 \u0648\u0643\u064A\u0644\u064A\u0629 \u0645\u062E\u0635\u0635\u0629", desc: "\u0642\u0648\u0649 \u0639\u0627\u0645\u0644\u0629 \u0630\u0627\u062A\u064A\u0629 \u0644\u0641\u0631\u0642 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0633\u0628\u0629 \u0648\u0627\u0644\u062A\u0637\u0648\u064A\u0631. \u0648\u0643\u0644\u0627\u0621 \u064A\u062A\u0639\u0644\u0645\u0648\u0646 \u0625\u062C\u0631\u0627\u0621\u0627\u062A\u0643 \u0648\u064A\u0646\u0641\u0630\u0648\u0646.", tag: "\u0625\u062F\u0627\u0631\u0629 \xB7 \u0645\u062D\u0627\u0633\u0628\u0629 \xB7 \u062A\u0637\u0648\u064A\u0631" },
        { key: "n8n_automation", title: "\u0623\u062A\u0645\u062A\u0629 n8n \u0648\u0627\u0644\u062A\u062F\u0631\u064A\u0628", desc: "\u062A\u0646\u0633\u064A\u0642 \u062E\u0637\u0648\u0637 \u0623\u0646\u0627\u0628\u064A\u0628 \u0628\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0645\u0624\u0633\u0633\u0627\u062A \u0639\u0628\u0631 n8n. \u0646\u0628\u0646\u064A \u0648\u0646\u062D\u0635\u0651\u0646 \u0648\u0646\u062F\u0631\u0651\u0628 \u0641\u0631\u064A\u0642\u0643 \u0639\u0644\u0649 \u0627\u0644\u062A\u0645\u0644\u0643.", tag: "n8n \xB7 \u062E\u0637\u0648\u0637 \xB7 \u062A\u062F\u0631\u064A\u0628" },
        { key: "private_ai_server", title: "\u0646\u0634\u0631 \u062E\u0627\u062F\u0645 \u0630\u0643\u0627\u0621 \u062E\u0627\u0635 \u0648\u0622\u0645\u0646", desc: "\u0646\u0634\u0631 \u0645\u062D\u0644\u064A / \u0633\u064A\u0627\u062F\u064A \u0645\u062F\u0639\u0648\u0645 \u0628\u062D\u0632\u0645\u0629 ODS / Osmantic. \u0628\u064A\u0627\u0646\u0627\u062A\u0643 \u0644\u0627 \u062A\u063A\u0627\u062F\u0631 \u0645\u062D\u064A\u0637\u0643.", tag: "\u0645\u062D\u0644\u064A \xB7 \u0633\u064A\u0627\u062F\u064A \xB7 ODS" },
        { key: "consulting_governance", title: "\u0627\u0644\u0627\u0633\u062A\u0634\u0627\u0631\u0627\u062A \u0648\u0627\u0644\u062D\u0648\u0643\u0645\u0629 \u0627\u0644\u0631\u0642\u0645\u064A\u0629", desc: "\u0627\u0633\u062A\u0634\u0627\u0631\u0627\u062A \u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629 \u0641\u064A \u0627\u0644\u0630\u0643\u0627\u0621 \u0648\u0623\u0637\u0631 \u062D\u0648\u0643\u0645\u0629 \u0648\u062E\u0627\u0631\u0637\u0629 \u0637\u0631\u064A\u0642 \u0644\u0644\u062C\u0627\u0647\u0632\u064A\u0629 \u0644\u0639\u0635\u0631 AGI.", tag: "\u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629 \xB7 \u062D\u0648\u0643\u0645\u0629" }
      ]
    },
    sovereign: {
      eyebrow: "\u0633\u064A\u0627\u062F\u064A \u0628\u0627\u0644\u062A\u0635\u0645\u064A\u0645",
      title: "\u062A\u0648\u0642\u0641 \u0639\u0646 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0623\u062F\u0648\u0627\u062A. \u0627\u0646\u0634\u0631 \u0648\u0643\u0644\u0627\u0621 \u064A\u062A\u0639\u0644\u0645\u0648\u0646.",
      desc: "\u064A\u0646\u0642\u0644 Watcher Claw \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u064A\u062F\u0648\u064A \u0625\u0644\u0649 \u0625\u062A\u0642\u0627\u0646 \u0630\u0627\u062A\u064A \u0645\u0646 \u0623\u062C\u0644 \u0639\u0627\u0626\u062F \u062A\u0634\u063A\u064A\u0644\u064A \u2014 \u062F\u0627\u062E\u0644 \u0633\u062D\u0627\u0628\u062A\u0643 \u0627\u0644\u062E\u0627\u0635\u0629.",
      bullets: ["\u062D\u0632\u0645\u0629 ODS / Osmantic \u0627\u0644\u062E\u0627\u0635\u0629", "\u0628\u062D\u062B RAG \u0641\u0648\u0642 \u0645\u0639\u0631\u0641\u062A\u0643 \u0627\u0644\u062F\u0627\u062E\u0644\u064A\u0629", "\u062A\u0643\u0627\u0645\u0644\u0627\u062A MCP \u0645\u0639 ERP / CRM", "\u0633\u062C\u0644\u0627\u062A \u062A\u062F\u0642\u064A\u0642 \u0648\u0636\u0648\u0627\u0628\u0637 \u0628\u0634\u0631\u064A\u0629"],
      cta: "\u062A\u062D\u062F\u062B \u0645\u0639 \u0645\u0647\u0646\u062F\u0633"
    },
    governance: {
      eyebrow: "\u0627\u0644\u0633\u064A\u0627\u062F\u0629 \u0627\u0644\u0631\u0642\u0645\u064A\u0629 \u0648\u0627\u0644\u0627\u062E\u0644\u0627\u0642\u064A\u0627\u062A",
      title: "\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0641\u064A \u062E\u062F\u0645\u0629 \u0627\u0644\u0625\u0646\u0633\u0627\u0646\u064A\u0629",
      subtitle: "\u0646\u0628\u0646\u064A \u0645\u0633\u062A\u0642\u0628\u0644\u0627\u064B \u0645\u0648\u062B\u0648\u0642\u0627\u064B \u0645\u0639 \u0642\u0648\u0627\u0639\u062F \u0648\u0627\u0636\u062D\u0629 \u0648\u0634\u0641\u0627\u0641\u064A\u0629 \u0645\u0637\u0644\u0642\u0640\u0629.",
      items: [
        { title: "\u0627\u0644\u062D\u0648\u0643\u0645\u0629", desc: "\u0642\u0648\u0627\u0639\u062F \u0648\u0627\u0636\u062D\u0629 \u0648\u0645\u0633\u0624\u0648\u0644\u064A\u0627\u062A \u0645\u062D\u062F\u062F\u0629 \u0641\u064A \u0643\u0627\u0641\u0629 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A." },
        { title: "\u0627\u0644\u0634\u0641\u0627\u0641\u064A\u0629", desc: "\u0646\u0638\u0627\u0645 \u064A\u0634\u0631\u062D \u0643\u0644 \u0642\u0631\u0627\u0631\u060C \u0648\u0644\u0627 \u064A\u062E\u0645\u0646 \u0623\u0628\u062F\u0627\u064B." },
        { title: "\u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064A\u0629", desc: "\u064A\u0628\u0642\u0649 \u0627\u0644\u0625\u0646\u0633\u0627\u0646 \u0641\u064A \u0642\u0644\u0628 \u0643\u0627\u0641\u0629 \u0627\u0644\u0642\u0631\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629." },
        { title: "\u0627\u0644\u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644", desc: "\u062A\u0643\u0646\u0648\u0644\u0648\u062C\u064A\u0627 \u0645\u0633\u062E\u0631\u0629 \u0644\u0643\u0631\u0627\u0645\u0629 \u0627\u0644\u0625\u0646\u0633\u0627\u0646 \u0648\u0627\u0644\u062A\u0645\u064A\u0632 \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A." }
      ]
    },
    chatSection: {
      eyebrow: "\u0627\u0633\u062A\u0634\u0627\u0631\u0629 \u062A\u0641\u0627\u0639\u0644\u064A\u0629",
      title: "\u062A\u062D\u062F\u062B \u0645\u0639 \u0645\u0633\u062A\u0634\u0627\u0631 \u0627\u0644\u0645\u0628\u064A\u0639\u0627\u062A \u0627\u0644\u0622\u0644\u064A \u0644\u0640 Watcher IA",
      subtitle: "\u0627\u0633\u062A\u0641\u0633\u0631 \u062D\u0648\u0644 \u0642\u0648\u0627\u0646\u0627 \u0627\u0644\u0639\u0627\u0645\u0644\u0629 \u0627\u0644\u0630\u0627\u062A\u064A\u0629\u060C \u0628\u0646\u064A\u062A\u0646\u0627 \u0627\u0644\u062A\u062D\u062A\u064A\u0629 \u0627\u0644\u0633\u064A\u0627\u062F\u064A\u0629\u060C \u0623\u0648 \u0647\u0646\u062F\u0633\u0629 \u0627\u0644\u0645\u0624\u0633\u0633\u0627\u062A \u0627\u0644\u0645\u062E\u0635\u0635\u0629.",
      placeholder: "\u0627\u0643\u062A\u0628 \u0627\u0633\u062A\u0641\u0633\u0627\u0631\u0643 \u062D\u0648\u0644 \u0648\u0643\u0644\u0627\u0621 Watcher IA...",
      send: "\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0627\u0633\u062A\u0639\u0644\u0627\u0645",
      initial: "\u0645\u0631\u062D\u0628\u0627\u064B \u0628\u0643. \u0623\u0646\u0627 \u0645\u0633\u062A\u0634\u0627\u0631 \u0627\u0644\u0645\u0628\u064A\u0639\u0627\u062A \u0627\u0644\u0622\u0644\u064A \u0644\u0640 Watcher IA. \u0643\u064A\u0641 \u064A\u0645\u0643\u0646\u0646\u064A \u0645\u0633\u0627\u0639\u062F\u0629 \u0645\u0624\u0633\u0633\u062A\u0643 \u0641\u064A \u0646\u0634\u0631 \u0633\u064A\u0631 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0630\u0627\u062A\u064A \u0627\u0644\u064A\u0648\u0645\u061F"
    },
    research: { eyebrow: "\u0623\u0628\u062D\u0627\u062B \u0648\u0645\u062F\u0648\u0646\u0627\u062A", title: "\u0645\u0646 \u0627\u0644\u0645\u062E\u062A\u0628\u0631", subtitle: "\u0623\u062F\u0644\u0629 \u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u062D\u0648\u0644 \u0627\u0644\u0623\u062A\u0645\u062A\u0629 \u0627\u0644\u0648\u0643\u064A\u0644\u064A\u0629.", readMore: "\u0627\u0642\u0631\u0623 \u0627\u0644\u0645\u0642\u0627\u0644" },
    register: {
      title: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0639\u0645\u0644\u0627\u0621",
      subtitle: "\u0623\u062E\u0628\u0631\u0646\u0627 \u0639\u0646 \u062D\u0627\u0644\u062A\u0643. \u0646\u0631\u062F \u062E\u0644\u0627\u0644 \u064A\u0648\u0645 \u0639\u0645\u0644 \u0648\u0627\u062D\u062F \u0645\u0639 \u0645\u0632\u0627\u0645\u0646\u0629 \u0641\u0648\u0631\u064A\u0629 \u0625\u0644\u0649 \u062E\u0637 \u0627\u0644\u0623\u0646\u0627\u0628\u064A\u0628 \u0627\u0644\u062A\u0646\u0633\u064A\u0642\u064A \u0644\u062F\u064A\u0646\u0627.",
      name: "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644",
      company: "\u0627\u0644\u0634\u0631\u0643\u0629",
      email: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0645\u0647\u0646\u064A",
      service: "\u0627\u0644\u062E\u062F\u0645\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629",
      message: "\u0635\u0641 \u0628\u0627\u062E\u062A\u0635\u0627\u0631 \u0627\u062D\u062A\u064A\u0627\u062C\u0643",
      services: [
        { value: "agentic_solutions", label: "\u062D\u0644\u0648\u0644 \u0648\u0643\u064A\u0644\u064A\u0629 \u0645\u062E\u0635\u0635\u0629" },
        { value: "n8n_automation", label: "\u0623\u062A\u0645\u062A\u0629 n8n \u0648\u0627\u0644\u062A\u062F\u0631\u064A\u0628" },
        { value: "private_ai_server", label: "\u062E\u0627\u062F\u0645 \u0630\u0643\u0627\u0621 \u062E\u0627\u0635 (ODS/Osmantic)" },
        { value: "consulting_governance", label: "\u0627\u0633\u062A\u0634\u0627\u0631\u0627\u062A \u0648\u062D\u0648\u0643\u0645\u0629 \u0631\u0642\u0645\u064A\u0629" },
        { value: "other", label: "\u0623\u062E\u0631\u0649" }
      ],
      submit: "\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628",
      success: "\u062A\u0645 \u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u0637\u0644\u0628 \u0648\u0625\u0631\u0633\u0627\u0644\u0647 \u0625\u0644\u0649 \u062E\u0637 \u0627\u0644\u0623\u0646\u0627\u0628\u064A\u0628. \u0633\u064A\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u0641\u0631\u064A\u0642\u0646\u0627 \u0642\u0631\u064A\u0628\u0627\u064B.",
      error: "\u0641\u0634\u0644 \u0627\u0644\u0625\u0631\u0633\u0627\u0644. \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062D\u0642\u0648\u0644 \u0648\u062D\u0627\u0648\u0644 \u0645\u062C\u062F\u062F\u0627\u064B.",
      optional: "\u0627\u062E\u062A\u064A\u0627\u0631\u064A"
    },
    footer: { tagline: "\u0648\u0643\u0644\u0627\u0621 \u0630\u0643\u0627\u0621 \u064A\u0639\u0645\u0644\u0648\u0646. \u0623\u062A\u0645\u062A \u0643\u0644 \u0634\u064A\u0621. \u062A\u0648\u0633\u0651\u0639 \u0628\u0644\u0627 \u062D\u062F\u0648\u062F.", rights: "\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638\u0629.", contact: "\u0627\u062A\u0635\u0644 \u0628\u0646\u0627", emailLabel: "\u0627\u0644\u0628\u0631\u064A\u062F", phoneLabel: "\u0627\u0644\u0647\u0627\u062A\u0641", addressLabel: "\u0627\u0644\u0645\u0642\u0631 \u0627\u0644\u0631\u0626\u064A\u0633\u064A" }
  }
};

// src/views.ts
var CONTACT = {
  email: "CEO@WATCHERIA.CLOUD",
  phone: "+21621304255",
  address: "01 Rue 13 Aout, Montfleury, Tunisia",
  domain: "watcheria.ai"
};
function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
__name(esc, "esc");
function langSwitcher(current) {
  const langs = ["en", "fr", "ar"];
  return `<nav aria-label="Language" class="flex items-center gap-1 rounded-full border border-slate-200 bg-white/70 p-1 text-xs font-bold transition-colors duration-500 dark:border-white/10 dark:bg-white/5">
    ${langs.map(
    (l) => `<a href="/${l}" hreflang="${l}" aria-current="${l === current ? "true" : "false"}"
            class="rounded-full px-3 py-1.5 transition-all duration-300 ${l === current ? "bg-watcher-navy text-white dark:bg-watcher-cyan dark:text-watcher-deep font-black shadow-md" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"}">${LANG_META[l].label}</a>`
  ).join("")}
  </nav>`;
}
__name(langSwitcher, "langSwitcher");
function layout(opts) {
  const { lang, dict, title: title2, description, content } = opts;
  const dir3 = LANG_META[lang].dir;
  const otherLangs = ["en", "fr", "ar"].filter((l) => l !== lang);
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir3}" class="scroll-smooth">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${esc(title2)} \u2014 Watcher IA</title>
<meta name="description" content="${esc(description)}"/>
${otherLangs.map((l) => `<link rel="alternate" hreflang="${l}" href="/${l}"/>`).join("\n")}
<script src="https://cdn.tailwindcss.com"><\/script>
<script>
tailwind.config = { darkMode: 'class', theme: { extend: {
  colors: { watcher: { navy:'#0A0A40', deep:'#060624', blue:'#1DA9E4', cyan:'#38E1FF', red:'#FF1E2D' } },
  fontFamily: { sans: ['Inter','Noto Kufi Arabic','system-ui','sans-serif'] }
}}};
<\/script>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Noto+Kufi+Arabic:wght@400;600;700&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="/static/styles.css"/>
<script>try{const t=localStorage.getItem('watcher-theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}<\/script>
</head>
<body class="bg-white font-sans text-slate-900 antialiased transition-colors duration-500 dark:bg-watcher-deep dark:text-slate-100">
<a href="#main" class="sr-only">Skip</a>

<header class="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md transition-colors duration-500 dark:border-white/10 dark:bg-watcher-deep/80">
  <div class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
    <a href="/${lang}" class="flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]">
      <img src="/static/logo.png" alt="Watcher IA Logo" class="h-10 sm:h-12 w-auto object-contain rounded-xl"/>
      <span class="leading-tight"><span class="block text-lg font-extrabold tracking-tight">Watcher <span class="text-watcher-blue">IA</span></span>
      <span class="block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">AI agents that work</span></span>
    </a>
    <nav class="hidden items-center gap-6 text-sm font-semibold lg:flex">
      <a class="transition-colors hover:text-watcher-blue" href="/${lang}#services">${esc(dict.nav.services)}</a>
      <a class="transition-colors hover:text-watcher-blue" href="/${lang}#sovereign">${esc(dict.nav.sovereign)}</a>
      <a class="transition-colors hover:text-watcher-blue" href="/${lang}#claw">${esc(dict.nav.claw)}</a>
      <a class="transition-colors hover:text-watcher-blue" href="/${lang}#chat">${esc(dict.nav.chat)}</a>
      <a class="transition-colors hover:text-watcher-blue" href="/${lang}#research">${esc(dict.nav.research)}</a>
      <a class="transition-colors hover:text-watcher-blue" href="/${lang}#contact">${esc(dict.nav.contact)}</a>
    </nav>
    <div class="flex items-center gap-2">
      ${langSwitcher(lang)}
      <button id="themeToggle" aria-label="Toggle theme" class="glass-panel rounded-full p-2 text-sm transition-all duration-300 hover:scale-105">\u{1F319}</button>
      <a href="/${lang}#register" class="hidden rounded-full bg-watcher-red px-4 py-2 text-sm font-bold text-white transition-all duration-300 hover:scale-105 sm:inline-block">${esc(dict.nav.register)}</a>
      <button id="menuBtn" class="glass-panel rounded-lg p-2 lg:hidden">\u2630</button>
    </div>
  </div>
  <div id="mobileMenu" class="hidden border-t border-slate-200 px-4 py-3 dark:border-white/10 lg:hidden">
    <div class="flex flex-col gap-3 text-sm font-semibold">
      <a href="/${lang}#services">${esc(dict.nav.services)}</a>
      <a href="/${lang}#sovereign">${esc(dict.nav.sovereign)}</a>
      <a href="/${lang}#claw">${esc(dict.nav.claw)}</a>
      <a href="/${lang}#chat">${esc(dict.nav.chat)}</a>
      <a href="/${lang}#research">${esc(dict.nav.research)}</a>
      <a href="/${lang}#contact">${esc(dict.nav.contact)}</a>
      <a href="/${lang}#register" class="rounded-full bg-watcher-red px-4 py-2 text-center font-bold text-white">${esc(dict.nav.register)}</a>
    </div>
  </div>
</header>

<main id="main">${content}</main>

<footer id="contact" class="bg-watcher-navy text-slate-200 transition-colors duration-500 dark:bg-black">
  <div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
    <div class="md:col-span-2">
      <div class="flex items-center gap-3">
        <img src="/static/logo.png" alt="Watcher IA Logo" class="h-11 w-auto object-contain rounded-xl"/>
        <div><p class="text-xl font-extrabold text-white">Watcher <span class="text-watcher-cyan">IA</span></p>
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">${esc(CONTACT.domain)}</p></div>
      </div>
      <p class="mt-4 max-w-md text-sm text-slate-300">${esc(dict.footer.tagline)}</p>
      <div class="mt-4 flex flex-wrap gap-2 text-xs font-bold">
        <span class="glass-panel rounded-2xl px-3 py-1 text-watcher-cyan border-white/10">AUTOMATE EVERYTHING</span>
        <span class="glass-panel rounded-2xl px-3 py-1 text-watcher-blue border-white/10">SCALE WITHOUT LIMITS</span>
        <span class="rounded-2xl bg-watcher-red px-3 py-1 text-white">DEPLOY AI AGENTS</span>
      </div>
    </div>
    <div>
      <p class="text-sm font-bold uppercase tracking-widest text-slate-400">${esc(dict.footer.contact)}</p>
      <ul class="mt-3 space-y-2 text-sm">
        <li><span class="text-slate-400 text-xs uppercase font-bold block">${esc(dict.footer.emailLabel)}</span><a class="transition-colors hover:text-watcher-cyan" href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
        <li class="mt-2"><span class="text-slate-400 text-xs uppercase font-bold block">${esc(dict.footer.phoneLabel)}</span><a class="transition-colors hover:text-watcher-cyan" href="tel:${CONTACT.phone.replace(/\s/g, "")}">${CONTACT.phone}</a></li>
        <li class="mt-2"><span class="text-slate-400 text-xs uppercase font-bold block">${esc(dict.footer.addressLabel)}</span><span class="text-slate-300">${esc(CONTACT.address)}</span></li>
      </ul>
    </div>
    <div>
      <p class="text-sm font-bold uppercase tracking-widest text-slate-400">Langues / Languages</p>
      <div class="mt-3 flex gap-2">
        <a href="/en" class="glass-panel rounded-xl px-3 py-2 text-sm font-bold transition-all hover:bg-white/20">EN</a>
        <a href="/fr" class="glass-panel rounded-xl px-3 py-2 text-sm font-bold transition-all hover:bg-white/20">FR</a>
        <a href="/ar" class="glass-panel rounded-xl px-3 py-2 text-sm font-bold transition-all hover:bg-white/20">\u0639\u0631\u0628\u064A</a>
      </div>
      <p class="mt-4 text-xs text-slate-500">\xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} Watcher IA. ${esc(dict.footer.rights)}</p>
    </div>
  </div>
</footer>
<script src="/static/app.js" defer><\/script>
</body></html>`;
}
__name(layout, "layout");
function homePage(lang, dict, posts) {
  const heroBadges = dict.hero.badges.map(
    (b, idx) => `<div class="glass-panel rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] border-white/10">
        <div class="flex items-center gap-3">
          <span class="flex h-8 w-8 items-center justify-center rounded-xl bg-watcher-blue/10 font-mono text-xs font-black text-watcher-cyan">0${idx + 1}</span>
          <span class="text-xs font-extrabold uppercase tracking-wide text-slate-200">${esc(b)}</span>
        </div>
      </div>`
  ).join("");
  const serviceImages = ["/static/service-1.jpg", "/static/service-2.jpg", "/static/service-3.jpg", "/static/service-4.jpg"];
  const serviceCards = dict.services.items.map(
    (s, i) => `<article class="glass-panel group rounded-3xl overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-2xl border-white/10 flex flex-col justify-between">
      <div>
        <div class="h-36 w-full mb-4 overflow-hidden rounded-2xl border border-white/10 bg-watcher-navy/50 relative">
          <img src="${serviceImages[i % serviceImages.length]}" alt="${esc(s.title)}" class="h-full w-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"/>
          <div class="absolute inset-0 bg-gradient-to-t from-watcher-deep/80 to-transparent"></div>
          <span class="absolute bottom-2 left-3 font-mono text-[10px] font-black uppercase text-watcher-cyan tracking-wider">MODULE 0${i + 1}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="rounded-full bg-watcher-cyan/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-watcher-cyan">${esc(s.tag)}</span>
        </div>
        <h3 class="mt-3 text-xl font-black tracking-tight">${esc(s.title)}</h3>
        <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">${esc(s.desc)}</p>
      </div>
      <div class="mt-6 pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
        <a href="/${lang}#register" data-service="${s.key}" class="svc-cta inline-flex items-center gap-2 text-sm font-extrabold text-watcher-red transition-all hover:translate-x-1">${esc(dict.nav.register)}</a>
        <span class="font-mono text-xs font-bold text-slate-400">EXECUTE</span>
      </div>
    </article>`
  ).join("");
  const clawStats = dict.claw.stats.map(
    (st) => `<div class="glass-panel rounded-2xl p-4 text-center transition-all duration-300 hover:scale-[1.02] border-white/10">
      <p class="text-3xl font-black text-watcher-cyan">${esc(st.value)}</p>
      <p class="mt-1 text-xs font-bold uppercase tracking-widest text-slate-300">${esc(st.label)}</p>
    </div>`
  ).join("");
  const governanceItems = dict.governance.items.map(
    (g, idx) => `<div class="glass-panel rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] border-white/10">
      <span class="font-mono text-xs font-black text-watcher-cyan">PRINCIPLE 0${idx + 1}</span>
      <h3 class="mt-2 text-lg font-extrabold text-white">${esc(g.title)}</h3>
      <p class="mt-2 text-sm text-slate-300 leading-relaxed">${esc(g.desc)}</p>
    </div>`
  ).join("");
  const postCards = posts.length === 0 ? `<p class="text-sm opacity-70">\u2014</p>` : posts.map(
    (p) => `<article class="glass-panel rounded-3xl overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-2xl border-white/10">
        ${p.cover ? `<div class="h-40 w-full mb-4 overflow-hidden rounded-2xl border border-white/10"><img src="${esc(p.cover)}" alt="${esc(p.title)}" class="h-full w-full object-cover opacity-90"/></div>` : ""}
        <div class="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>${esc((p.published_at || "").slice(0, 10))}</span>
          <span class="font-mono text-watcher-blue">${esc(p.slug)}</span>
        </div>
        <h3 class="mt-3 text-lg font-black leading-snug tracking-tight">${esc(p.title)}</h3>
        <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">${esc(p.excerpt)}</p>
        <div class="mt-6 pt-4 border-t border-slate-200/60 dark:border-white/10">
          <a href="/${lang}/blog/${esc(p.slug)}" class="inline-flex items-center text-sm font-bold text-watcher-blue transition-all hover:translate-x-1">${esc(dict.research.readMore)} \u2192</a>
        </div>
      </article>`
  ).join("");
  const serviceOptions = dict.register.services.map((o) => `<option value="${o.value}">${esc(o.label)}</option>`).join("");
  return `
<!-- HERO SECTION (Atmospheric full-width background image + breathing blobs + glassmorphism) -->
<section class="relative overflow-hidden bg-watcher-deep text-white py-28 lg:py-36">
  <div class="absolute inset-0 z-0">
    <img src="/static/hero-bg.jpg" alt="Agentic Data Flows" class="h-full w-full object-cover opacity-30"/>
    <div class="absolute inset-0 bg-gradient-to-r from-watcher-deep via-watcher-deep/90 to-watcher-deep/70"></div>
  </div>
  <div class="hero-grid absolute inset-0 pointer-events-none opacity-45 z-10"></div>
  <div class="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-watcher-blue/20 blur-3xl animate-breathe pointer-events-none z-10"></div>
  <div class="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-watcher-red/15 blur-3xl animate-breathe-delayed pointer-events-none z-10"></div>

  <div class="relative z-20 mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 items-center">
    <div>
      <div class="inline-flex items-center gap-2 rounded-full border border-watcher-cyan/30 bg-watcher-cyan/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-watcher-cyan backdrop-blur-md">
        <span class="h-2 w-2 rounded-full bg-watcher-cyan animate-ping"></span>
        ${esc(dict.hero.eyebrow)}
      </div>
      <h1 class="mt-6 text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
        ${esc(dict.hero.titleA)}<br/>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-watcher-red via-watcher-magenta to-watcher-cyan">${esc(dict.hero.titleB)}</span>
      </h1>
      <p class="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">${esc(dict.hero.subtitle)}</p>
      <div class="mt-8 flex flex-wrap gap-4">
        <a href="/${lang}#register" class="rounded-full bg-watcher-red px-8 py-4 font-bold text-white shadow-xl shadow-red-900/50 transition-all duration-300 hover:scale-105 hover:bg-red-600">${esc(dict.hero.ctaPrimary)}</a>
        <a href="/${lang}#services" class="glass-panel rounded-full px-8 py-4 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-white/10 border-white/10">${esc(dict.hero.ctaSecondary)}</a>
      </div>
      <div class="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
        ${dict.strip.map((s) => `<div class="font-mono text-xs font-bold uppercase tracking-wider text-watcher-cyan"><span class="text-watcher-red mr-1.5">/</span>${esc(s)}</div>`).join("")}
      </div>
    </div>
    <div class="relative">
      <div class="grid gap-4 sm:grid-cols-2">${heroBadges}</div>
    </div>
  </div>
</section>

<!-- WATCHER CLAW PLATFORM SHOWCASE -->
<section id="claw" class="relative overflow-hidden bg-watcher-navy py-24 text-white">
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-watcher-blue/10 via-transparent to-transparent pointer-events-none"></div>
  <div class="relative mx-auto max-w-7xl px-4 sm:px-6">
    <div class="grid gap-12 lg:grid-cols-2 items-center">
      <div>
        <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-watcher-cyan">${esc(dict.claw.eyebrow)}</p>
        <h2 class="mt-3 font-serif text-4xl font-black leading-tight tracking-tight sm:text-5xl">${esc(dict.claw.title)}</h2>
        <p class="mt-4 text-slate-300 leading-relaxed">${esc(dict.claw.subtitle)}</p>
        <div class="mt-8 grid grid-cols-3 gap-4">${clawStats}</div>
        <div class="mt-10">
          <a href="/${lang}#register" class="inline-flex items-center rounded-full bg-watcher-cyan px-8 py-4 font-black text-watcher-deep transition-all duration-300 hover:scale-105 hover:bg-white shadow-lg shadow-cyan-900/30">${esc(dict.claw.cta)} \u2192</a>
        </div>
      </div>
      <div class="glass-panel relative rounded-3xl p-6 shadow-2xl backdrop-blur-md border-white/10">
        <div class="rounded-2xl bg-watcher-deep/90 p-6 font-mono text-xs text-watcher-cyan border border-white/10">
          <p class="text-slate-400">// WATCHER CLAW KERNEL V4.2 (GEMINI AI ENGINE)</p>
          <p class="mt-3 text-white font-bold">&gt; Initializing multi-agent supervisor...</p>
          <p class="mt-1.5 text-emerald-400">&gt; SOP loaded: Accounting &amp; Admin Workforces [OK]</p>
          <p class="mt-1.5 text-watcher-cyan">&gt; RAG pipeline connected to private vector DB [SECURE]</p>
          <p class="mt-1.5 text-watcher-blue">&gt; n8n webhook listener active on port 5678 [LISTENING]</p>
          <div class="mt-6 rounded-2xl bg-black/50 p-5 border border-white/10 text-slate-300">
            <p class="text-[11px] uppercase tracking-widest text-watcher-red font-extrabold">Autonomous Loop</p>
            <p class="mt-2 text-sm leading-relaxed text-white">\u201CWatcher Claw transitions manual execution into autonomous mastery for operational ROI.\u201D</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SERVICES GRID (Refactored with Glassmorphism & Unique Abstract Images) -->
<section id="services" class="bg-slate-50 dark:bg-watcher-navy/40 py-24 transition-colors duration-500">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <div class="max-w-3xl">
      <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-watcher-blue">${esc(dict.services.eyebrow)}</p>
      <h2 class="mt-3 text-3xl font-black tracking-tight sm:text-5xl">${esc(dict.services.title)}</h2>
      <p class="mt-4 text-lg text-slate-600 dark:text-slate-300">${esc(dict.services.subtitle)}</p>
    </div>
    <div class="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">${serviceCards}</div>
  </div>
</section>

<!-- GEMINI AI SALES AGENT (WATCHER CLAW CHAT) -->
<section id="chat" class="bg-white dark:bg-watcher-deep py-24 transition-colors duration-500 border-y border-slate-200 dark:border-white/10">
  <div class="mx-auto max-w-4xl px-4 sm:px-6">
    <div class="text-center">
      <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-watcher-cyan">${esc(dict.chatSection.eyebrow)}</p>
      <h2 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl">${esc(dict.chatSection.title)}</h2>
      <p class="mt-3 text-slate-600 dark:text-slate-300">${esc(dict.chatSection.subtitle)}</p>
    </div>
    <div class="glass-panel mt-10 rounded-3xl p-6 shadow-2xl backdrop-blur-md border-white/10">
      <div id="chatHistory" class="space-y-4 max-h-[380px] overflow-y-auto p-4 font-mono text-xs">
        <div class="glass-panel rounded-2xl p-4 border-white/10">
          <p class="text-[10px] uppercase font-extrabold tracking-widest text-watcher-cyan">Watcher AI Sales Agent (Gemini Pro)</p>
          <p class="mt-1.5 text-slate-800 dark:text-slate-200">${esc(dict.chatSection.initial)}</p>
        </div>
      </div>
      <form id="chatForm" data-lang="${lang}" class="mt-6 flex gap-3">
        <input id="chatInput" required class="flex-1 rounded-2xl border border-slate-300 bg-white/50 px-5 py-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-watcher-cyan dark:border-white/15 dark:bg-watcher-deep dark:text-white" placeholder="${esc(dict.chatSection.placeholder)}"/>
        <button type="submit" class="rounded-2xl bg-watcher-blue px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-sky-500 shadow-lg">${esc(dict.chatSection.send)}</button>
      </form>
    </div>
  </div>
</section>

<!-- SOVEREIGN AI & GOVERNANCE -->
<section id="sovereign" class="relative overflow-hidden bg-watcher-deep text-white py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <div class="grid gap-12 lg:grid-cols-2 items-center">
      <div>
        <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-watcher-cyan">${esc(dict.governance.eyebrow)}</p>
        <h2 class="mt-3 font-serif text-4xl font-black leading-tight sm:text-5xl">${esc(dict.governance.title)}</h2>
        <p class="mt-4 text-slate-300 leading-relaxed">${esc(dict.governance.subtitle)}</p>
        <div class="mt-8 grid gap-4 sm:grid-cols-2">${governanceItems}</div>
      </div>
      <div class="glass-panel rounded-3xl p-8 shadow-2xl backdrop-blur-md border-white/10">
        <h3 class="text-2xl font-black text-white">${esc(dict.sovereign.title)}</h3>
        <p class="mt-4 text-slate-300 text-sm leading-relaxed">${esc(dict.sovereign.desc)}</p>
        <ul class="mt-6 space-y-4">
          ${dict.sovereign.bullets.map((b, idx) => `<li class="glass-panel flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] border-white/10"><span class="font-mono text-xs font-black text-watcher-cyan">0${idx + 1}</span><span class="font-bold text-sm text-white">${esc(b)}</span></li>`).join("")}
        </ul>
        <div class="mt-8">
          <a href="/${lang}#register" class="inline-block rounded-full bg-watcher-red px-8 py-4 font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-red-600">${esc(dict.sovereign.cta)}</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- RESEARCH & BLOG ARCHIVE -->
<section id="research" class="bg-white dark:bg-watcher-deep py-24 transition-colors duration-500">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-watcher-blue">${esc(dict.research.eyebrow)}</p>
    <div class="flex flex-wrap items-end justify-between gap-3">
      <h2 class="text-3xl font-black tracking-tight sm:text-5xl">${esc(dict.research.title)}</h2>
      <a href="/${lang}/blog" class="text-sm font-extrabold text-watcher-blue transition-colors hover:text-watcher-cyan">/ ${esc(dict.nav.research)}</a>
    </div>
    <p class="mt-3 text-lg text-slate-600 dark:text-slate-300">${esc(dict.research.subtitle)}</p>
    <div class="mt-12 grid gap-6 md:grid-cols-3">${postCards}</div>
  </div>
</section>

<!-- REGISTER (light card on slate) -->
<section id="register" class="bg-slate-50 dark:bg-black/40 py-24 transition-colors duration-500">
  <div class="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 items-center">
    <div>
      <h2 class="text-3xl font-black tracking-tight sm:text-5xl">${esc(dict.register.title)}</h2>
      <p class="mt-4 text-lg text-slate-600 dark:text-slate-300">${esc(dict.register.subtitle)}</p>
      <div class="glass-panel mt-8 rounded-3xl p-8 space-y-4 text-sm border-white/10">
        <div><span class="text-xs font-black uppercase tracking-widest text-watcher-blue block">${esc(dict.footer.emailLabel)}</span><a class="font-bold text-slate-900 dark:text-white" href="mailto:${CONTACT.email}">${CONTACT.email}</a></div>
        <div class="pt-3 border-t border-slate-200/60 dark:border-white/15"><span class="text-xs font-black uppercase tracking-widest text-watcher-blue block">${esc(dict.footer.phoneLabel)}</span><a class="font-bold text-slate-900 dark:text-white" href="tel:${CONTACT.phone}">${CONTACT.phone}</a></div>
        <div class="pt-3 border-t border-slate-200/60 dark:border-white/15"><span class="text-xs font-black uppercase tracking-widest text-watcher-blue block">${esc(dict.footer.addressLabel)}</span><span class="font-bold text-slate-900 dark:text-white">${esc(CONTACT.address)}</span></div>
      </div>
    </div>
    <form id="regForm" data-lang="${lang}" class="glass-panel rounded-3xl p-8 shadow-2xl border-white/10">
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block"><span class="text-sm font-bold">${esc(dict.register.name)} *</span>
          <input name="name" required minlength="2" class="mt-2 w-full rounded-2xl border border-slate-300 bg-white/50 px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-watcher-cyan dark:border-white/15 dark:bg-watcher-deep dark:text-white" placeholder="John Doe"/></label>
        <label class="block"><span class="text-sm font-bold">${esc(dict.register.company)} <span class="font-normal opacity-60">(${esc(dict.register.optional)})</span></span>
          <input name="company" class="mt-2 w-full rounded-2xl border border-slate-300 bg-white/50 px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-watcher-cyan dark:border-white/15 dark:bg-watcher-deep dark:text-white" placeholder="Acme SARL"/></label>
      </div>
      <label class="mt-4 block"><span class="text-sm font-bold">${esc(dict.register.email)} *</span>
        <input name="email" type="email" required class="mt-2 w-full rounded-2xl border border-slate-300 bg-white/50 px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-watcher-cyan dark:border-white/15 dark:bg-watcher-deep dark:text-white" placeholder="you@company.com"/></label>
      <label class="mt-4 block"><span class="text-sm font-bold">${esc(dict.register.service)} *</span>
        <select name="service_request" required class="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-watcher-cyan dark:border-white/15 dark:bg-watcher-deep dark:text-white">${serviceOptions}</select></label>
      <label class="mt-4 block"><span class="text-sm font-bold">${esc(dict.register.message)}</span>
        <textarea name="message" rows="4" class="mt-2 w-full rounded-2xl border border-slate-300 bg-white/50 px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-watcher-cyan dark:border-white/15 dark:bg-watcher-deep dark:text-white"></textarea></label>
      <button class="mt-8 w-full rounded-full bg-watcher-navy px-6 py-4 font-extrabold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-slate-800 dark:bg-watcher-blue dark:hover:bg-sky-500 shadow-xl">${esc(dict.register.submit)}</button>
      <p id="regMsg" role="status" class="mt-4 hidden rounded-2xl p-4 text-sm font-bold"></p>
    </form>
  </div>
</section>`;
}
__name(homePage, "homePage");
function blogIndexPage(lang, dict, posts) {
  const cards = posts.map(
    (p) => `<a href="/${lang}/blog/${esc(p.slug)}" class="glass-panel block rounded-3xl overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-2xl border-white/10">
      ${p.cover ? `<div class="h-40 w-full mb-4 overflow-hidden rounded-2xl border border-white/10"><img src="${esc(p.cover)}" alt="${esc(p.title)}" class="h-full w-full object-cover"/></div>` : ""}
      <p class="text-xs font-mono text-watcher-blue">${esc((p.published_at || "").slice(0, 10))}</p>
      <h3 class="mt-3 text-xl font-black tracking-tight">${esc(p.title)}</h3>
      <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">${esc(p.excerpt)}</p>
      <span class="mt-6 inline-block text-sm font-extrabold text-watcher-blue transition-transform hover:translate-x-1">${esc(dict.research.readMore)} \u2192</span></a>`
  ).join("");
  return `<section class="mx-auto max-w-7xl px-4 py-24 sm:px-6">
    <h1 class="text-4xl font-black tracking-tight sm:text-5xl">${esc(dict.research.title)}</h1>
    <p class="mt-3 text-lg text-slate-600 dark:text-slate-300">${esc(dict.research.subtitle)}</p>
    <div class="mt-12 grid gap-6 md:grid-cols-3">${cards || "<p>\u2014</p>"}</div>
  </section>`;
}
__name(blogIndexPage, "blogIndexPage");
function blogPostPage(lang, dict, post) {
  return `<article class="mx-auto max-w-3xl px-4 py-24 sm:px-6">
    <a href="/${lang}/blog" class="text-sm font-bold text-watcher-blue transition-colors hover:text-watcher-cyan">\u2190 /${lang}/blog</a>
    ${post.cover ? `<div class="h-64 w-full my-6 overflow-hidden rounded-3xl border border-white/10 shadow-2xl"><img src="${esc(post.cover)}" alt="${esc(post.title)}" class="h-full w-full object-cover"/></div>` : ""}
    <p class="mt-6 text-xs font-mono font-bold text-watcher-blue uppercase tracking-widest">${esc((post.published_at || "").slice(0, 10))}</p>
    <h1 class="mt-3 text-4xl font-black tracking-tight leading-tight sm:text-5xl">${esc(post.title)}</h1>
    <p class="mt-4 text-xl leading-relaxed text-slate-600 dark:text-slate-300 font-semibold">${esc(post.excerpt)}</p>
    <div class="glass-panel mt-10 rounded-3xl p-8 leading-relaxed text-slate-700 dark:text-slate-200 border-white/10">${esc(post.body)}</div>
    <div class="mt-12">
      <a href="/${lang}#register" class="inline-block rounded-full bg-watcher-red px-8 py-4 font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-red-600">${esc(dict.nav.register)}</a>
    </div>
  </article>`;
}
__name(blogPostPage, "blogPostPage");

// src/index.ts
var app = new Hono2();
var VALID_SERVICES = /* @__PURE__ */ new Set([
  "agentic_solutions",
  "n8n_automation",
  "private_ai_server",
  "consulting_governance",
  "other"
]);
var N8N_WEBHOOK_URL = "https://gideon-ironless-overderisively.ngrok-free.dev/webhook/c94df705-a521-44a9-b215-c4215e6d155e";
function langOrDefault(param, envLang) {
  if (param && isLang(param))
    return param;
  if (envLang && isLang(envLang))
    return envLang;
  return DEFAULT_LANG;
}
__name(langOrDefault, "langOrDefault");
app.get("/api/health", (c) => c.json({ ok: true, service: "watcher-ia", ts: (/* @__PURE__ */ new Date()).toISOString() }));
app.get("/api/chat/:lang", async (c) => {
  const raw2 = c.req.param("lang");
  const lang = isLang(raw2) ? raw2 : DEFAULT_LANG;
  const prompt = c.req.query("q") || "";
  const apiKey = c.env.GEMINI_API_KEY;
  return new Response(
    new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        const send2 = /* @__PURE__ */ __name((data) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}

`));
        }, "send");
        send2({ status: "reasoning", message: lang === "fr" ? "Analyse de la requ\xEAte par Watcher Claw (Gemini Pro)..." : lang === "ar" ? "\u062C\u0627\u0631\u064A \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u0628\u0648\u0627\u0633\u0637\u0629 Watcher Claw (Gemini)..." : "Analyzing query through Watcher Claw kernel (Gemini AI)..." });
        let reply = "";
        if (apiKey) {
          try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const systemInstruction = `You are the professional Sales Agent for Watcher IA ("Watcher Claw"). 
Location headquarters: 01 Rue 13 Aout, Montfleury, Tunisia.
Core focus: Bespoke Agentic Solutions (Autonomous workforces for admin, accounting, dev), n8n Workflow Automation & Training, Secure Private AI Server Deployment (ODS/Osmantic stack, on-premise/sovereign), and Consulting & Digital Governance.
Tone: Precise, authoritative, helpful, and tech-forward. Respond in the user's language (${lang}).`;
            const model = genAI.getGenerativeModel({
              model: "gemini-1.5-flash",
              systemInstruction
            });
            const result = await model.generateContentStream(prompt);
            for await (const chunk of result.stream) {
              const text = chunk.text();
              if (text) {
                reply += text;
              }
            }
          } catch (err) {
            console.error("Gemini API error:", err);
            reply = lang === "fr" ? "Erreur lors de la communication avec le noyau Gemini. Nos solutions agentiques restent pleinement op\xE9rationnelles." : lang === "ar" ? "\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0646\u0648\u0627\u0629 Gemini. \u062D\u0644\u0648\u0644\u0646\u0627 \u0627\u0644\u0648\u0643\u064A\u0644\u064A\u0629 \u0644\u0627 \u062A\u0632\u0627\u0644 \u062A\u0639\u0645\u0644 \u0628\u0643\u0641\u0627\u0621\u0629 \u0643\u0627\u0645\u0644\u0629." : "Error communicating with Gemini kernel. Our autonomous workforces remain fully operational.";
          }
        } else {
          await new Promise((r) => setTimeout(r, 500));
          const q = prompt.toLowerCase();
          if (q.includes("price") || q.includes("cost") || q.includes("tarif") || q.includes("prix") || q.includes("\u0633\u0639\u0631")) {
            reply = lang === "fr" ? "Nos solutions agentiques sont bas\xE9es sur le ROI op\xE9rationnel. Chaque workforce (admin, compta, dev) est calibr\xE9e selon vos volumes." : lang === "ar" ? "\u062A\u0639\u062A\u0645\u062F \u062D\u0644\u0648\u0644\u0646\u0627 \u0627\u0644\u0648\u0643\u064A\u0644\u064A\u0629 \u0639\u0644\u0649 \u0627\u0644\u0639\u0627\u0626\u062F \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A. \u064A\u062A\u0645 \u0645\u0639\u0627\u064A\u0631\u0629 \u0643\u0644 \u0642\u0648\u0629 \u0639\u0627\u0645\u0644\u0629 \u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u062D\u062C\u0645 \u0639\u0645\u0644\u064A\u0627\u062A\u0643." : "Our agentic solutions are outcome-based, measured by operational ROI. Each autonomous workforce is customized to your volume.";
          } else {
            reply = lang === "fr" ? `Watcher IA d\xE9ploie des workforces autonomes (admin, compta, dev) orchestr\xE9es via n8n depuis notre si\xE8ge au 01 Rue 13 Aout, Montfleury, Tunisie.` : lang === "ar" ? `\u062A\u0642\u0648\u0645 Watcher IA \u0628\u0646\u0634\u0631 \u0642\u0648\u0649 \u0639\u0627\u0645\u0644\u0629 \u0630\u0627\u062A\u064A\u0629 (\u0625\u062F\u0627\u0631\u0629\u060C \u0645\u062D\u0627\u0633\u0628\u0629\u060C \u062A\u0637\u0648\u0631) \u0645\u0646\u0633\u0642\u0629 \u0639\u0628\u0631 n8n \u0645\u0646 \u0645\u0642\u0631\u0646\u0627 \u0641\u064A 01 Rue 13 Aout, Montfleury, Tunisia.` : `Watcher IA deploys autonomous workforces (admin, accounting, dev) orchestrated via n8n from 01 Rue 13 Aout, Montfleury, Tunisia.`;
          }
        }
        send2({ status: "complete", reply });
        controller.close();
      }
    }),
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      }
    }
  );
});
app.get("/", (c) => {
  const lang = langOrDefault(void 0, c.env.DEFAULT_LANG);
  return c.redirect(`/${lang}`, 302);
});
app.get("/:lang", async (c) => {
  const raw2 = c.req.param("lang");
  if (!isLang(raw2))
    return c.redirect(`/${langOrDefault(void 0, c.env.DEFAULT_LANG)}`, 302);
  const lang = raw2;
  const dict = dicts[lang];
  let posts = [];
  try {
    const { results } = await c.env.DB.prepare(
      "SELECT slug, title, excerpt, cover, published_at FROM posts WHERE lang = ? ORDER BY published_at DESC LIMIT 6"
    ).bind(lang).all();
    posts = results ?? [];
  } catch {
    posts = [];
  }
  const html = layout({
    lang,
    dict,
    title: lang === "ar" ? "\u0648\u0627\u062A\u0634\u0631 IA \u2014 \u0648\u0643\u0644\u0627\u0621 \u0630\u0643\u0627\u0621 \u064A\u0639\u0645\u0644\u0648\u0646" : lang === "fr" ? "Watcher IA \u2014 des agents IA qui travaillent" : "Watcher IA \u2014 AI agents that work",
    description: dict.hero.subtitle,
    content: homePage(lang, dict, posts)
  });
  return c.html(html);
});
app.get("/:lang/blog", async (c) => {
  const raw2 = c.req.param("lang");
  if (!isLang(raw2))
    return c.redirect("/en/blog", 302);
  const dict = dicts[raw2];
  const { results } = await c.env.DB.prepare(
    "SELECT slug, title, excerpt, cover, published_at FROM posts WHERE lang = ? ORDER BY published_at DESC LIMIT 30"
  ).bind(raw2).all();
  return c.html(
    layout({ lang: raw2, dict, title: "Research", description: dict.research.subtitle, content: blogIndexPage(raw2, dict, results ?? []) })
  );
});
app.get("/:lang/blog/:slug", async (c) => {
  const raw2 = c.req.param("lang");
  if (!isLang(raw2))
    return c.redirect("/en/blog", 302);
  const slug = c.req.param("slug");
  const row = await c.env.DB.prepare("SELECT slug, title, excerpt, body, cover, published_at FROM posts WHERE lang = ? AND slug = ?").bind(raw2, slug).first();
  if (!row)
    return c.notFound();
  const dict = dicts[raw2];
  return c.html(layout({ lang: raw2, dict, title: row.title, description: row.excerpt, content: blogPostPage(raw2, dict, row) }));
});
app.post("/:lang/register", async (c) => {
  const raw2 = c.req.param("lang");
  const lang = isLang(raw2) ? raw2 : DEFAULT_LANG;
  let data = {};
  try {
    const ct = c.req.header("content-type") ?? "";
    if (ct.includes("application/json"))
      data = await c.req.json();
    else {
      const form = await c.req.parseBody();
      for (const [k, v] of Object.entries(form))
        data[k] = String(v ?? "");
    }
  } catch {
    return c.json({ ok: false, error: "bad_request" }, 400);
  }
  const name = (data.name || "").trim();
  const company = (data.company || "").trim();
  const email = (data.email || "").trim().toLowerCase();
  const service_request = (data.service_request || "").trim();
  const message = (data.message || "").trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  if (name.length < 2 || !emailOk || !VALID_SERVICES.has(service_request)) {
    return c.json({ ok: false, error: "validation", fields: { name: name.length >= 2, email: emailOk, service: VALID_SERVICES.has(service_request) } }, 422);
  }
  try {
    await c.env.DB.prepare(
      "INSERT INTO clients (name, company, email, service_request, message, lang) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(name, company || null, email, service_request, message || null, lang).run();
  } catch (e) {
    console.error("D1 insert failed", e);
    return c.json({ ok: false, error: "db_error" }, 500);
  }
  try {
    const n8nPayload = {
      event: "client_registration",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      lang,
      client: { name, company, email, service_request, message },
      headquarters: "01 Rue 13 Aout, Montfleury, Tunisia"
    };
    await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(n8nPayload)
    });
  } catch (err) {
    console.error("N8N webhook sync failed (non-blocking for user)", err);
  }
  return c.json({ ok: true, message: dicts[lang].register.success }, 201);
});
app.get("/:lang/admin/registrations", async (c) => {
  const token = c.req.query("token") || c.req.header("x-admin-token");
  if (!token || token !== c.env.ADMIN_TOKEN)
    return c.json({ ok: false }, 401);
  const { results } = await c.env.DB.prepare("SELECT id, name, company, email, service_request, lang, status, created_at FROM clients ORDER BY id DESC LIMIT 100").all();
  return c.json({ ok: true, results });
});
var src_default = app;

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error3 = reduceError(e);
    return Response.json(error3, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-s1uCM3/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-s1uCM3/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
/*! Bundled license information:

@google/generative-ai/dist/index.mjs:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@google/generative-ai/dist/index.mjs:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=index.js.map
