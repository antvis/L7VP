export * from './dataset-parser';
export * from './validator';
export * from './widget';
export * from './dataset';
export * from './spec';

export const requestIdleCallback =
  window.requestIdleCallback ||
  function (callback: IdleRequestCallback) {
    const start = Date.now();
    return setTimeout(function () {
      callback({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start));
        },
      });
    }, 1);
  };

export const cancelIdleCallback =
  window.cancelIdleCallback ||
  function (id: string) {
    clearTimeout(id);
  };
