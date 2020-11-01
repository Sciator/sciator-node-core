/** Throw wrapper for use with ?? operator */
export const throwReturn = <T>(msg: string): T => {
  throw new Error(msg);
};


export const randInt: {
  /** generates ranodm integer number */
  (maxExcluded: number): number;
  /** generates ranodm integer number */
  (minIncluded: number, maxExcluded: number): number;
} = (a: number, b?: number): number => {
  if (b === undefined)
    return Math.floor(Math.random() * a);
  else
    return Math.floor(Math.random() * (b - a)) + a;
};


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

// todo: add validator ?
/** try to parse json, returns undefinad if parsing failed */
export const JSONparseNoError = <T>(JSONstring: string): T | undefined => {
  try {
    return JSON.parse(JSONstring);
  } catch {
    return undefined;
  }
};

/** create promise that resolves after given ms' */
export const sleep = async (ms: number) => {
  return new Promise((r) => {
    setTimeout(() => r(), ms);
  });
};

/** Returns given object as readonly */
export const asReadonly = <T>(obj: T) => obj as Readonly<T>;

/** Returns last element of an array */
export const last = <T>(arr: T[]) => arr[arr.length - 1];


export const reducer = asReadonly({
  sum: (a: number, b: number) => a + b,
});

/** apply function to object and return result */
export const selfMap = <TObj, TRet>(obj: TObj, fnc: (o: TObj) => TRet): TRet =>
  fnc(obj);

/** removes all elements satisfying condition, returns array of all removed elements */
export const removeAllWhere = <T>(arr: T[], pred: (o: T) => boolean) => {
  const removed: T[] = [];
  for (let i = arr.length; i--;) {
    if (pred(arr[i]))
      removed.push(arr.splice(i, 1)[0]);
  }
  return removed.reverse();
};

export const execAsync = (cmd: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    (await import("child_process")).exec(cmd, { windowsHide: true }, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      resolve(stdout);
    });
  });
};
