export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type DateJSON<isJson extends boolean> = isJson extends true
  ? string
  : Date;

export type DefaultOptions = { isJson: boolean };
