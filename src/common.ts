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
  if (b === undefined) {
    return Math.floor(Math.random() * a);
  }
  else {
    return Math.floor(Math.random() * (b - a)) + a;
  }
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
export const sleep = async (ms: number) =>
  new Promise(r => setTimeout(r, ms))
  ;

/** Returns given object as readonly */
export const asReadonly = <T>(obj: T) => obj as Readonly<T>;

/** apply function to object and return result */
export const selfMap = <TObj, TRet>(obj: TObj, fnc: (o: TObj) => TRet): TRet =>
  fnc(obj)
  ;
