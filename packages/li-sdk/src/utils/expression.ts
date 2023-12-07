type JSExpression = { type: 'JSExpression'; value: string };
type JSFunction = { type: 'JSFunction'; value: string };

export const isJSExpression = (data: any): data is JSExpression => {
  return typeof data === 'object' && data && data.type === 'JSExpression' && typeof data.value === 'string';
};

export const isJSFunction = (data: any): data is JSFunction => {
  return typeof data === 'object' && data && data.type === 'JSFunction' && typeof data.value === 'string';
};

/**
 * 解析表达式
 * @param expression "date + time"
 * @param scope { date: 1, time: 2, }
 * @returns
 */
export const parseExpression = (expression: string, scope: Record<string, any>) => {
  try {
    const sandboxCode = `with(scope) { return ${expression} }`;
    const evalResult = new Function('scope', sandboxCode).call(null, scope);
    return evalResult;
  } catch (err) {
    console.error(`parse expression '${expression}' error`, err);
    return undefined;
  }
};

/**
 * 解析表达式
 * @param jSFunction "function(...arguments) { return 1 + 2}"
 * @returns
 */
export const parseFunction = (jSFunction: string) => {
  const fnBody = `
    return function() {
      try {
        return (${jSFunction}).apply(null, arguments);
      } catch(e) {
        logger.warn('call function failed: ', e);
        return e.message;
      }
    };
  `;

  try {
    const fn = new Function(fnBody)();
    return fn;
  } catch (err) {
    console.error(`parse function '${jSFunction}' error`, err);
    return undefined;
  }
};
