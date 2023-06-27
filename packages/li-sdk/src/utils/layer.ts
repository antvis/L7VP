import type { ImplementLayer, ImplementLayerOptions } from '../types';

/**
 * 实现一个图层资产:
 * LI 资产研发教程 🔗 https://www.yuque.com/antv/htpfbw/zqvk302x61qq2kcq
 */
export function implementLayer<VP extends Record<string, unknown> = Record<string, unknown>, CP extends VP = VP>(
  options: ImplementLayerOptions<VP, CP>,
): ImplementLayer<VP, CP> {
  const registerForm = options.registerForm ?? { schema: {} };
  const result: ImplementLayer<VP, CP> = Object.assign(options, { registerForm });

  return result;
}
