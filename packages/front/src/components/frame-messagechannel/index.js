/**
 * 用 BroastcastChannel 代替 MessageChannel 更合适 ???
 * threshold 有两层的设计
 */


const channel = new MessageChannel();
const mainPort = channel.port1;   // 用于定时发送 msg
const childPort = channel.port2;  // 收到 msg 执行注册的回调函数

let globalMinThreshold = 2000;
export function setGlobalMinThreshold(value) {
  globalMinThreshold = value <= 16.7 ? 16.7 : value;
}

/**
 * 管理回调函数
 * 增加函数执行的 threshold，
 */
let listeners = [];
export function addListener(fn, threshold) {
  let isActive = true;

  function listener(...args) {
    if (isActive) fn(...args);
  }
  listener.threshold = threshold || 0;
  listener.execTimestamp = 0;

  listeners.push(listener);

  return () => {
    isActive = false;
    listeners = listeners.filter(item => item !== listener);
  };
}
function notifyListeners(...args) {
  listeners.forEach(listener => {
    const [workingTimestamp] = args;
    const { execTimestamp, threshold } = listener;

    if (workingTimestamp - execTimestamp >= threshold) {
      listener.execTimestamp = workingTimestamp;
      listener(...args);
    }
  });
}
// 用于 debug
export const getAllListeners = () => {
  return [...listeners];
}

// 执行回调函数
childPort.onmessage = function (event) {
  const { data: workingTimestamp } = event;
  notifyListeners(workingTimestamp);
}

// 时间线，用frame开启一个宏任务
let workingTimestamp = performance.now();
let started = null;
export function startInterval() {
  // 防止重复调用 startInterval
  if (started) {
    return;
  }
  started = true;

  function framePostMessage(currentTimestamp) {
    const diff = currentTimestamp - workingTimestamp;

    if (diff >= globalMinThreshold) {
      workingTimestamp = currentTimestamp;
      mainPort.postMessage(workingTimestamp);
    }

    window.requestAnimationFrame(framePostMessage);
  }

  window.requestAnimationFrame(framePostMessage);
}