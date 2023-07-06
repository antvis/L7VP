function makeIntervalComplete(values: ([number, number] | [null | undefined, number] | [number, number | null])[]) {
  return values.map((val) => {
    const _val: [number, number] = val as [number, number];
    if (val[0] === undefined || val[0] === null) {
      _val[0] = Number.MIN_SAFE_INTEGER;
    }

    if (val[1] === undefined || val[1] === null) {
      _val[1] = Number.MAX_SAFE_INTEGER;
    }

    return _val;
  });
}

export const between = (value: number, filterValues: [number, number][]) => {
  const checkRange = (range: [number, number]) => {
    const [lowerBound, upperBound] = range;
    return value >= lowerBound && value <= upperBound;
  };
  return makeIntervalComplete(filterValues).some(checkRange);
};
