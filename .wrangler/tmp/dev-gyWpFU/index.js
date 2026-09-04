var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// .wrangler/tmp/bundle-qyNVg3/strip-cf-connecting-ip-header.js
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
    nav: { services: "Services", sovereign: "Sovereign AI", claw: "Watcher Claw", research: "Research", contact: "Contact", register: "Get started" },
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
    research: { eyebrow: "Research & notes", title: "From the lab", subtitle: "Operational playbooks on agentic automation.", readMore: "Read note" },
    register: {
      title: "Client registration",
      subtitle: "Tell us about your use case. We reply within 1 business day.",
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
      success: "Request received. Our team will contact you shortly.",
      error: "Submission failed. Check fields and retry.",
      optional: "optional"
    },
    footer: { tagline: "AI agents that work. Automate everything. Scale without limits.", rights: "All rights reserved.", contact: "Contact" }
  },
  fr: {
    nav: { services: "Services", sovereign: "IA souveraine", claw: "Watcher Claw", research: "Recherche", contact: "Contact", register: "D\xE9marrer" },
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
    research: { eyebrow: "Recherche & notes", title: "Depuis le labo", subtitle: "Playbooks op\xE9rationnels sur l\u2019automatisation agentique.", readMore: "Lire la note" },
    register: {
      title: "Inscription client",
      subtitle: "D\xE9crivez votre besoin. R\xE9ponse sous 1 jour ouvr\xE9.",
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
      success: "Demande re\xE7ue. Notre \xE9quipe vous contactera rapidement.",
      error: "\xC9chec d\u2019envoi. V\xE9rifiez les champs et r\xE9essayez.",
      optional: "optionnel"
    },
    footer: { tagline: "Des agents IA qui travaillent. Automatisez tout. Scalez sans limites.", rights: "Tous droits r\xE9serv\xE9s.", contact: "Contact" }
  },
  ar: {
    nav: { services: "\u0627\u0644\u062E\u062F\u0645\u0627\u062A", sovereign: "\u0630\u0643\u0627\u0621 \u0633\u064A\u0627\u062F\u064A", claw: "\u0648\u0627\u062A\u0634\u0631 \u0643\u0644\u0648", research: "\u0627\u0644\u0623\u0628\u062D\u0627\u062B", contact: "\u0627\u062A\u0635\u0644 \u0628\u0646\u0627", register: "\u0627\u0628\u062F\u0623 \u0627\u0644\u0622\u0646" },
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
    research: { eyebrow: "\u0623\u0628\u062D\u0627\u062B \u0648\u0645\u062F\u0648\u0646\u0627\u062A", title: "\u0645\u0646 \u0627\u0644\u0645\u062E\u062A\u0628\u0631", subtitle: "\u0623\u062F\u0644\u0629 \u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u062D\u0648\u0644 \u0627\u0644\u0623\u062A\u0645\u062A\u0629 \u0627\u0644\u0648\u0643\u064A\u0644\u064A\u0629.", readMore: "\u0627\u0642\u0631\u0623 \u0627\u0644\u0645\u0642\u0627\u0644" },
    register: {
      title: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0639\u0645\u0644\u0627\u0621",
      subtitle: "\u0623\u062E\u0628\u0631\u0646\u0627 \u0639\u0646 \u062D\u0627\u0644\u062A\u0643. \u0646\u0631\u062F \u062E\u0644\u0627\u0644 \u064A\u0648\u0645 \u0639\u0645\u0644 \u0648\u0627\u062D\u062F.",
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
      success: "\u062A\u0645 \u0627\u0633\u062A\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u0637\u0644\u0628. \u0633\u064A\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u0641\u0631\u064A\u0642\u0646\u0627 \u0642\u0631\u064A\u0628\u0627\u064B.",
      error: "\u0641\u0634\u0644 \u0627\u0644\u0625\u0631\u0633\u0627\u0644. \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062D\u0642\u0648\u0644 \u0648\u062D\u0627\u0648\u0644 \u0645\u062C\u062F\u062F\u0627\u064B.",
      optional: "\u0627\u062E\u062A\u064A\u0627\u0631\u064A"
    },
    footer: { tagline: "\u0648\u0643\u0644\u0627\u0621 \u0630\u0643\u0627\u0621 \u064A\u0639\u0645\u0644\u0648\u0646. \u0623\u062A\u0645\u062A \u0643\u0644 \u0634\u064A\u0621. \u062A\u0648\u0633\u0651\u0639 \u0628\u0644\u0627 \u062D\u062F\u0648\u062F.", rights: "\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638\u0629.", contact: "\u0627\u062A\u0635\u0644 \u0628\u0646\u0627" }
  }
};

// src/views.ts
var CONTACT = {
  email: "CEO@WATCHERIA.CLOUD",
  phone: "+21621304255",
  address: "01 Rue 13 Aout, Manflouri, Tunisia",
  domain: "watcheria.ai"
};
function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
__name(esc, "esc");
function logoSVG(size = 40) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <ellipse cx="32" cy="32" rx="30" ry="19" stroke="#1DA9E4" stroke-width="2.5" fill="#0A0A40"/>
    <ellipse cx="32" cy="32" rx="30" ry="19" stroke="#0A0A40" stroke-width="1" stroke-dasharray="3 4" opacity=".5"/>
    <circle cx="32" cy="32" r="13" fill="#1DA9E4"/>
    <circle cx="32" cy="32" r="8" fill="#0A0A40"/>
    <text x="32" y="37.5" text-anchor="middle" font-family="Inter,sans-serif" font-weight="800" font-size="13" fill="#fff">W</text>
    <g fill="none" stroke="#38E1FF" stroke-width="1.4">
      <circle cx="8" cy="14" r="1.6"/><circle cx="56" cy="14" r="1.6"/>
      <circle cx="5" cy="32" r="1.6"/><circle cx="59" cy="32" r="1.6"/>
      <circle cx="8" cy="50" r="1.6"/><circle cx="56" cy="50" r="1.6"/>
    </g></svg>`;
}
__name(logoSVG, "logoSVG");
function langSwitcher(current) {
  const langs = ["en", "fr", "ar"];
  return `<nav aria-label="Language" class="flex items-center gap-1 rounded-full border border-slate-200 bg-white/70 p-1 text-xs font-bold dark:border-white/15 dark:bg-white/5">
    ${langs.map(
    (l) => `<a href="/${l}" hreflang="${l}" aria-current="${l === current ? "true" : "false"}"
            class="rounded-full px-3 py-1.5 transition ${l === current ? "bg-watcher-navy text-white dark:bg-watcher-cyan dark:text-watcher-deep" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"}">${LANG_META[l].label}</a>`
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
<body class="bg-white font-sans text-slate-900 antialiased dark:bg-watcher-deep dark:text-slate-100">
<a href="#main" class="sr-only">Skip</a>

<header class="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-watcher-deep/80">
  <div class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
    <a href="/${lang}" class="flex items-center gap-3">
      ${logoSVG(40)}
      <span class="leading-tight"><span class="block text-lg font-extrabold tracking-tight">Watcher <span class="text-watcher-blue">IA</span></span>
      <span class="block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">AI agents that work</span></span>
    </a>
    <nav class="hidden items-center gap-6 text-sm font-semibold lg:flex">
      <a class="hover:text-watcher-blue" href="/${lang}#services">${esc(dict.nav.services)}</a>
      <a class="hover:text-watcher-blue" href="/${lang}#sovereign">${esc(dict.nav.sovereign)}</a>
      <a class="hover:text-watcher-blue" href="/${lang}#claw">${esc(dict.nav.claw)}</a>
      <a class="hover:text-watcher-blue" href="/${lang}#research">${esc(dict.nav.research)}</a>
      <a class="hover:text-watcher-blue" href="/${lang}#contact">${esc(dict.nav.contact)}</a>
    </nav>
    <div class="flex items-center gap-2">
      ${langSwitcher(lang)}
      <button id="themeToggle" aria-label="Toggle theme" class="rounded-full border border-slate-200 p-2 text-sm dark:border-white/15">\u{1F319}</button>
      <a href="/${lang}#register" class="hidden rounded-full bg-watcher-red px-4 py-2 text-sm font-bold text-white hover:opacity-90 sm:inline-block">${esc(dict.nav.register)}</a>
      <button id="menuBtn" class="rounded-lg border border-slate-200 p-2 lg:hidden dark:border-white/15">\u2630</button>
    </div>
  </div>
  <div id="mobileMenu" class="hidden border-t border-slate-200 px-4 py-3 dark:border-white/10 lg:hidden">
    <div class="flex flex-col gap-3 text-sm font-semibold">
      <a href="/${lang}#services">${esc(dict.nav.services)}</a>
      <a href="/${lang}#sovereign">${esc(dict.nav.sovereign)}</a>
      <a href="/${lang}#claw">${esc(dict.nav.claw)}</a>
      <a href="/${lang}#research">${esc(dict.nav.research)}</a>
      <a href="/${lang}#contact">${esc(dict.nav.contact)}</a>
      <a href="/${lang}#register" class="rounded-full bg-watcher-red px-4 py-2 text-center font-bold text-white">${esc(dict.nav.register)}</a>
    </div>
  </div>
</header>

<main id="main">${content}</main>

<footer id="contact" class="bg-watcher-navy text-slate-200 dark:bg-black">
  <div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
    <div class="md:col-span-2">
      <div class="flex items-center gap-3">${logoSVG(44)}
        <div><p class="text-xl font-extrabold text-white">Watcher <span class="text-watcher-cyan">IA</span></p>
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">${esc(CONTACT.domain)}</p></div>
      </div>
      <p class="mt-4 max-w-md text-sm text-slate-300">${esc(dict.footer.tagline)}</p>
      <div class="mt-4 flex flex-wrap gap-2 text-xs font-bold">
        <span class="rounded-full bg-white/10 px-3 py-1">AUTOMATE EVERYTHING</span>
        <span class="rounded-full bg-white/10 px-3 py-1">SCALE WITHOUT LIMITS</span>
        <span class="rounded-full bg-watcher-red px-3 py-1 text-white">DEPLOY AI AGENTS</span>
      </div>
    </div>
    <div>
      <p class="text-sm font-bold uppercase tracking-widest text-slate-400">${esc(dict.footer.contact)}</p>
      <ul class="mt-3 space-y-2 text-sm">
        <li><a class="hover:text-watcher-cyan" href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
        <li><a class="hover:text-watcher-cyan" href="tel:${CONTACT.phone.replace(/\s/g, "")}">${CONTACT.phone}</a></li>
        <li class="text-slate-300">${esc(CONTACT.address)}</li>
      </ul>
    </div>
    <div>
      <p class="text-sm font-bold uppercase tracking-widest text-slate-400">Langues / Languages</p>
      <div class="mt-3 flex gap-2">
        <a href="/en" class="rounded-lg bg-white/10 px-3 py-2 text-sm font-bold hover:bg-white/20">EN</a>
        <a href="/fr" class="rounded-lg bg-white/10 px-3 py-2 text-sm font-bold hover:bg-white/20">FR</a>
        <a href="/ar" class="rounded-lg bg-white/10 px-3 py-2 text-sm font-bold hover:bg-white/20">\u0639\u0631\u0628\u064A</a>
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
    (b) => `<span class="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-200">
        <span class="mr-2 inline-block h-2 w-2 rounded-full bg-watcher-red"></span>${esc(b)}</span>`
  ).join("");
  const serviceCards = dict.services.items.map(
    (s, i) => `<article class="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5">
      <p class="text-[11px] font-extrabold uppercase tracking-[0.18em] text-watcher-blue">${esc(s.tag)}</p>
      <h3 class="mt-2 text-xl font-extrabold">${esc(s.title)}</h3>
      <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">${esc(s.desc)}</p>
      <a href="/${lang}#register" data-service="${s.key}" class="svc-cta mt-4 inline-flex items-center gap-2 text-sm font-bold text-watcher-red">\u2192 ${esc(dict.nav.register)} <span class="font-mono text-xs opacity-60">0${i + 1}</span></a>
    </article>`
  ).join("");
  const clawStats = dict.claw.stats.map(
    (st) => `<div class="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur">
      <p class="text-3xl font-black text-watcher-cyan">${esc(st.value)}</p>
      <p class="mt-1 text-xs font-bold uppercase tracking-widest text-slate-300">${esc(st.label)}</p>
    </div>`
  ).join("");
  const governanceItems = dict.governance.items.map(
    (g) => `<div class="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <h3 class="text-lg font-extrabold text-watcher-cyan">${esc(g.title)}</h3>
      <p class="mt-2 text-sm text-slate-300">${esc(g.desc)}</p>
    </div>`
  ).join("");
  const postCards = posts.length === 0 ? `<p class="text-sm opacity-70">\u2014</p>` : posts.map(
    (p) => `<article class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
        <p class="text-xs font-semibold text-slate-500">${esc((p.published_at || "").slice(0, 10))} \xB7 ${esc(p.slug)}</p>
        <h3 class="mt-2 text-lg font-extrabold leading-snug">${esc(p.title)}</h3>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">${esc(p.excerpt)}</p>
        <a href="/${lang}/blog/${esc(p.slug)}" class="mt-3 inline-block text-sm font-bold text-watcher-blue">${esc(dict.research.readMore)} \u2192</a>
      </article>`
  ).join("");
  const serviceOptions = dict.register.services.map((o) => `<option value="${o.value}">${esc(o.label)}</option>`).join("");
  return `
<!-- HERO (dark with executive visual aesthetic) -->
<section class="relative overflow-hidden bg-watcher-deep text-white">
  <div class="hero-grid absolute inset-0"></div>
  <div class="relative mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-2 lg:pt-24 items-center">
    <div>
      <p class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-watcher-cyan">${esc(dict.hero.eyebrow)}</p>
      <h1 class="mt-5 text-5xl font-black leading-[0.95] sm:text-6xl">${esc(dict.hero.titleA)}<br/><span class="text-watcher-red">${esc(dict.hero.titleB)}</span></h1>
      <p class="mt-5 max-w-xl text-slate-300">${esc(dict.hero.subtitle)}</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="/${lang}#register" class="rounded-full bg-watcher-red px-7 py-3.5 font-bold text-white shadow-lg shadow-red-900/40 hover:opacity-90">${esc(dict.hero.ctaPrimary)}</a>
        <a href="/${lang}#services" class="rounded-full border border-white/20 px-7 py-3.5 font-bold hover:bg-white/10">${esc(dict.hero.ctaSecondary)}</a>
      </div>
      <div class="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-sm font-bold">
        ${dict.strip.map((s) => `<span><span class="text-watcher-red">\u25CF</span> ${esc(s)}</span>`).join("")}
      </div>
    </div>
    <div class="relative">
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-2">${heroBadges}</div>
    </div>
  </div>
</section>

<!-- WATCHER CLAW PLATFORM SHOWCASE -->
<section id="claw" class="relative overflow-hidden bg-watcher-navy py-20 text-white">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <div class="grid gap-12 lg:grid-cols-2 items-center">
      <div>
        <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-watcher-cyan">${esc(dict.claw.eyebrow)}</p>
        <h2 class="mt-2 font-serif text-4xl font-black leading-tight sm:text-5xl">${esc(dict.claw.title)}</h2>
        <p class="mt-4 text-slate-300 leading-relaxed">${esc(dict.claw.subtitle)}</p>
        <div class="mt-8 grid grid-cols-3 gap-4">${clawStats}</div>
        <div class="mt-8">
          <a href="/${lang}#register" class="rounded-full bg-watcher-cyan px-7 py-3.5 font-bold text-watcher-deep hover:bg-white">${esc(dict.claw.cta)} \u2192</a>
        </div>
      </div>
      <div class="relative rounded-3xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur">
        <div class="absolute inset-0 bg-gradient-to-tr from-watcher-blue/20 to-transparent rounded-3xl pointer-events-none"></div>
        <div class="rounded-2xl bg-watcher-deep/90 p-6 font-mono text-xs text-watcher-cyan border border-white/10">
          <p class="text-slate-400">// WATCHER CLAW KERNEL V4.2</p>
          <p class="mt-2 text-white font-bold">&gt; Initializing multi-agent supervisor...</p>
          <p class="mt-1 text-emerald-400">&gt; SOP loaded: Accounting &amp; Admin Workforces [OK]</p>
          <p class="mt-1 text-watcher-cyan">&gt; RAG pipeline connected to private vector DB [SECURE]</p>
          <p class="mt-1 text-watcher-blue">&gt; n8n webhook listener active on port 5678 [LISTENING]</p>
          <div class="mt-4 rounded-xl bg-black/40 p-4 border border-white/10 text-slate-300">
            <p class="text-xs uppercase tracking-widest text-watcher-red font-bold">Autonomous Loop</p>
            <p class="mt-1">\u201CWatcher Claw transitions manual execution into autonomous mastery for operational ROI.\u201D</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SERVICES (light / dark hybrid) -->
<section id="services" class="bg-slate-50 dark:bg-watcher-navy/40 py-20">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-watcher-blue">${esc(dict.services.eyebrow)}</p>
    <h2 class="mt-2 max-w-2xl text-3xl font-black sm:text-4xl">${esc(dict.services.title)}</h2>
    <p class="mt-2 text-slate-600 dark:text-slate-300">${esc(dict.services.subtitle)}</p>
    <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">${serviceCards}</div>
  </div>
</section>

<!-- SOVEREIGN AI & GOVERNANCE -->
<section id="sovereign" class="relative overflow-hidden bg-watcher-deep text-white py-20">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <div class="grid gap-12 lg:grid-cols-2 items-center">
      <div>
        <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-watcher-cyan">${esc(dict.governance.eyebrow)}</p>
        <h2 class="mt-2 font-serif text-4xl font-black leading-tight sm:text-5xl">${esc(dict.governance.title)}</h2>
        <p class="mt-4 text-slate-300 leading-relaxed">${esc(dict.governance.subtitle)}</p>
        <div class="mt-8 grid gap-4 sm:grid-cols-2">${governanceItems}</div>
      </div>
      <div class="rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur">
        <h3 class="text-xl font-extrabold text-white">${esc(dict.sovereign.title)}</h3>
        <p class="mt-3 text-slate-300 text-sm leading-relaxed">${esc(dict.sovereign.desc)}</p>
        <ul class="mt-6 space-y-3">
          ${dict.sovereign.bullets.map((b) => `<li class="flex items-start gap-3"><span class="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-watcher-cyan"></span><span class="font-semibold text-sm">${esc(b)}</span></li>`).join("")}
        </ul>
        <div class="mt-8">
          <a href="/${lang}#register" class="inline-block rounded-full bg-watcher-red px-6 py-3 font-bold text-white shadow-lg hover:opacity-90">${esc(dict.sovereign.cta)}</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- RESEARCH (hybrid light) -->
<section id="research" class="bg-white dark:bg-watcher-deep py-20">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <p class="text-xs font-extrabold uppercase tracking-[0.22em] text-watcher-blue">${esc(dict.research.eyebrow)}</p>
    <div class="flex flex-wrap items-end justify-between gap-3">
      <h2 class="text-3xl font-black sm:text-4xl">${esc(dict.research.title)}</h2>
      <a href="/${lang}/blog" class="text-sm font-bold text-watcher-blue">/ ${esc(dict.nav.research)} \u2192</a>
    </div>
    <p class="mt-2 text-slate-600 dark:text-slate-300">${esc(dict.research.subtitle)}</p>
    <div class="mt-10 grid gap-6 md:grid-cols-3">${postCards}</div>
  </div>
</section>

<!-- REGISTER (light card on slate) -->
<section id="register" class="bg-slate-50 dark:bg-black/40 py-20">
  <div class="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 items-center">
    <div>
      <h2 class="text-3xl font-black sm:text-4xl">${esc(dict.register.title)}</h2>
      <p class="mt-2 text-slate-600 dark:text-slate-300">${esc(dict.register.subtitle)}</p>
      <ul class="mt-8 space-y-3 text-sm">
        <li class="flex items-center gap-3">\u2709\uFE0F <a class="font-bold text-watcher-blue" href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
        <li class="flex items-center gap-3">\u{1F4DE} <a class="font-bold" href="tel:${CONTACT.phone}">${CONTACT.phone}</a></li>
        <li class="flex items-center gap-3">\u{1F4CD} ${esc(CONTACT.address)}</li>
      </ul>
    </div>
    <form id="regForm" data-lang="${lang}" class="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-white/10 dark:bg-white/5">
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block"><span class="text-sm font-bold">${esc(dict.register.name)} *</span>
          <input name="name" required minlength="2" class="mt-1 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 dark:border-white/15" placeholder="John Doe"/></label>
        <label class="block"><span class="text-sm font-bold">${esc(dict.register.company)} <span class="font-normal opacity-60">(${esc(dict.register.optional)})</span></span>
          <input name="company" class="mt-1 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 dark:border-white/15" placeholder="Acme SARL"/></label>
      </div>
      <label class="mt-4 block"><span class="text-sm font-bold">${esc(dict.register.email)} *</span>
        <input name="email" type="email" required class="mt-1 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 dark:border-white/15" placeholder="you@company.com"/></label>
      <label class="mt-4 block"><span class="text-sm font-bold">${esc(dict.register.service)} *</span>
        <select name="service_request" required class="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 dark:border-white/15 dark:bg-watcher-deep dark:text-white">${serviceOptions}</select></label>
      <label class="mt-4 block"><span class="text-sm font-bold">${esc(dict.register.message)}</span>
        <textarea name="message" rows="4" class="mt-1 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 dark:border-white/15"></textarea></label>
      <button class="mt-6 w-full rounded-full bg-watcher-navy px-6 py-4 font-bold text-white hover:opacity-90 dark:bg-watcher-blue">${esc(dict.register.submit)}</button>
      <p id="regMsg" role="status" class="mt-4 hidden rounded-xl p-3 text-sm font-semibold"></p>
    </form>
  </div>
</section>`;
}
__name(homePage, "homePage");
function blogIndexPage(lang, dict, posts) {
  const cards = posts.map(
    (p) => `<a href="/${lang}/blog/${esc(p.slug)}" class="block rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg dark:border-white/10 dark:bg-white/5">
      <p class="text-xs text-slate-500">${esc((p.published_at || "").slice(0, 10))}</p>
      <h3 class="mt-2 text-xl font-extrabold">${esc(p.title)}</h3>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">${esc(p.excerpt)}</p>
      <span class="mt-3 inline-block text-sm font-bold text-watcher-blue">${esc(dict.research.readMore)} \u2192</span></a>`
  ).join("");
  return `<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6">
    <h1 class="text-4xl font-black">${esc(dict.research.title)}</h1>
    <p class="mt-2 text-slate-600 dark:text-slate-300">${esc(dict.research.subtitle)}</p>
    <div class="mt-10 grid gap-6 md:grid-cols-3">${cards || "<p>\u2014</p>"}</div>
  </section>`;
}
__name(blogIndexPage, "blogIndexPage");
function blogPostPage(lang, dict, post) {
  return `<article class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
    <a href="/${lang}/blog" class="text-sm font-bold text-watcher-blue">\u2190 /${lang}/blog</a>
    <p class="mt-4 text-xs font-bold uppercase tracking-widest text-slate-500">${esc((post.published_at || "").slice(0, 10))}</p>
    <h1 class="mt-2 text-4xl font-black leading-tight">${esc(post.title)}</h1>
    <p class="mt-3 text-lg text-slate-600 dark:text-slate-300">${esc(post.excerpt)}</p>
    <div class="prose mt-8 dark:prose-invert"><p>${esc(post.body)}</p></div>
    <a href="/${lang}#register" class="mt-10 inline-block rounded-full bg-watcher-red px-7 py-3.5 font-bold text-white">${esc(dict.nav.register)}</a>
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
function langOrDefault(param, envLang) {
  if (param && isLang(param))
    return param;
  if (envLang && isLang(envLang))
    return envLang;
  return DEFAULT_LANG;
}
__name(langOrDefault, "langOrDefault");
app.get("/api/health", (c) => c.json({ ok: true, service: "watcher-ia", ts: (/* @__PURE__ */ new Date()).toISOString() }));
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
      "SELECT slug, title, excerpt, published_at FROM posts WHERE lang = ? ORDER BY published_at DESC LIMIT 6"
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
    "SELECT slug, title, excerpt, published_at FROM posts WHERE lang = ? ORDER BY published_at DESC LIMIT 30"
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
  const row = await c.env.DB.prepare("SELECT slug, title, excerpt, body, published_at FROM posts WHERE lang = ? AND slug = ?").bind(raw2, slug).first();
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

// .wrangler/tmp/bundle-qyNVg3/middleware-insertion-facade.js
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

// .wrangler/tmp/bundle-qyNVg3/middleware-loader.entry.ts
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
//# sourceMappingURL=index.js.map
