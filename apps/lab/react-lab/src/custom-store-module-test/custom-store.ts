export let count = 0;
export const setStateFunctions = new Set<(count: number) => void>();

export const countInc = (num: number) => {
  count += num;

  return count;
};
