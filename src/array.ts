import { asReadonly } from ".";

export const range: {
  /** creates array with numbers from 0 to max-1 */
  (maxExcluded: number): number[];
  /** creates array with numbers from min to max-1 */
  (minIncluded: number, maxExcluded: number): number[];
} = (a: number, b?: number): number[] => {
  const arr = [];
  if (b === undefined)
    for (let i = 0; i < a; i++)
      arr.push(i);
  else
    for (let i = a; i < b; i++)
      arr.push(i);
  return arr;
};


/** zip together two arrays */
export const zip = <A, B>(arr1: A[], arr2: B[]): [A, B][] => {
  return arr1.map((k, i) => [k, arr2[i]]);
};

/** removes and returns item at given index */
export const popAt = <T>(arr: T[], indx: number) => {
  return arr.splice(indx)[0];
};

/** Returns last element of an array */
export const last = <T>(arr: T[]) => arr[arr.length - 1];

export const reducer = asReadonly({
  sum: (a: number, b: number) => a + b,
});

/** Removes all elements satisfying condition, returns array of all removed elements */
export const removeAllWhere = <T>(arr: T[], pred: (o: T) => boolean) => {
  const removed: T[] = [];
  for (let i = arr.length; i--;) {
    if (pred(arr[i]))
      removed.push(arr.splice(i, 1)[0]);
  }
  return removed.reverse();
};
