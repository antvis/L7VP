import type { Draft, nothing } from 'immer';
import produce, { freeze, setAutoFreeze } from 'immer';
import type { Dispatch } from 'react';
import { useCallback, useMemo, useReducer, useState } from 'react';

setAutoFreeze(false);

export type Reducer<S = any, A = any> = (
  draftState: Draft<S>,
  action: A,
) => void | (S extends undefined ? typeof nothing : S);
export type DraftFunction<S> = (draft: Draft<S>) => void;
export type Updater<S> = (arg: S | DraftFunction<S>) => void;
export type ImmerHook<S> = [S, Updater<S>];
export function useImmer<S = any>(initialValue: S | (() => S)): ImmerHook<S>;

export function useImmer(initialValue: any) {
  const [val, updateValue] = useState(() =>
    // change freeze to default
    freeze(typeof initialValue === 'function' ? initialValue() : initialValue),
  );
  return [
    val,
    useCallback((updater: any) => {
      if (typeof updater === 'function') updateValue(produce(updater));
      else updateValue(freeze(updater));
    }, []),
  ];
}

export function useImmerReducer<S = any, A = any>(
  reducer: Reducer<S, A>,
  initialState: S,
  initialAction?: (initial: any) => S,
): [S, Dispatch<A>];
export function useImmerReducer(reducer: any, initialState: any, initialAction: any) {
  const cachedReducer = useMemo(() => produce(reducer), [reducer]);
  return useReducer(cachedReducer, initialState as any, initialAction);
}
