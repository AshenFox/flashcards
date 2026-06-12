export function calcCounter(params: {
  current: number;
  additionNumber?: number | null;
  value?: string;
  repeatNum?: number;
}): number {
  const { current, additionNumber, value, repeatNum } = params;
  let result: number;

  if (value != null) {
    result = parseInt(value, 10);
    if (Number.isNaN(result)) result = 1;
  } else if (additionNumber != null) {
    const remainder = Math.abs(current % additionNumber);
    const abs = Math.abs(additionNumber);

    if (remainder) {
      result = current + (additionNumber > 0 ? abs - remainder : -remainder);
    } else {
      result = current + additionNumber;
    }
  } else {
    result = current;
  }

  const cap = repeatNum ?? 999;
  if (result > cap) result = cap;
  if (result > 999) result = 999;
  if (result < 1 || !result) result = 1;

  return result;
}
