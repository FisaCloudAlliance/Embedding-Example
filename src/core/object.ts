interface ObjectConstructor {
  toFormatZeroHyphen(
    val: any,
    locales?: string,
    options?: Intl.NumberFormatOptions & {
      prefix?: string;
      suffix?: string;
    }
  ): string;
  toFormatZeroEmpty(
    val: any,
    option?: {
      locales?: string;
      options?: Intl.NumberFormatOptions;
      prefix?: string;
      suffix?: string;
    }
  ): string;

  hasChanges<T>(x: T, y: T): boolean;

  toArrayAsync<T>(iterator: AsyncGenerator<T>): Promise<Array<T>>;

  deepCopy<T>(obj: T): T;

  toNumber(
    value: any,
    option?: {
      positiveNumber?: boolean;
      ignoreDecimalPoint?: boolean;
    }
  ): number;
}

Object.toNumber = (
  value: any,
  option?: {
    positiveNumber?: boolean;
    ignoreDecimalPoint?: boolean;
  }
) => {
  if (typeof value === "string") {
    if (String.isNullOrWhiteSpace(value)) {
      return 0;
    }
    const newVal = Number(value);
    if (Number.isNaN(newVal)) {
      return 0;
    }

    if (option?.positiveNumber && newVal < 0) {
      return 0;
    }
    if (option?.ignoreDecimalPoint) {
      return Math.floor(newVal);
    }
    return newVal;
  }

  const newVal = Number(value);
  if (Number.isNaN(newVal)) {
    return 0;
  }
  if (option?.positiveNumber && newVal < 0) {
    return 0;
  }
  if (option?.ignoreDecimalPoint) {
    return Math.floor(newVal);
  }
  return newVal;
};

Object.deepCopy = (source: any): any => {
  return deepCopy(source);
};
function deepCopy<T>(source: T): T {
  if (source == null || source === null || source === undefined) {
    return source;
  }

  if (source instanceof Date) {
    return new Date(source.getTime()) as any;
  }

  if (Array.isArray(source)) {
    return (source as any).map(deepCopy) as any;
  }

  if (typeof source === "object") {
    const copy = {} as T;
    for (const key in source as any) {
      copy[key] = deepCopy((source as any)[key]);
    }
    return copy;
  }

  return source;
}

Object.toArrayAsync = async (iterator: AsyncGenerator<any>) => {
  if (!iterator) {
    return [];
  }

  const array = new Array<any>();
  for await (const value of iterator) {
    array.push(value);
  }
  return array;
};

Object.hasChanges = (x, y) => {
  for (const key in x) {
    const xValue = JSON.stringify(x[key] ?? {});
    const yValue = JSON.stringify(y[key] ?? {});
    if (xValue !== yValue) {
      return true;
    }
  }
  return false;
};

Object.toFormatZeroHyphen = (
  val: any,
  locales?: string,
  options?: Intl.NumberFormatOptions & {
    prefix?: string;
    suffix?: string;
  }
) => {
  if (!val) return " － ";
  if (typeof val === "number") {
    const newValue = (val as Number)?.toFormatZeroHyphen(locales, options);
    return `${options?.prefix ?? ""}${newValue}${options?.suffix ?? ""}`;
  }
  return val;
};
Object.toFormatZeroEmpty = (
  val: any,
  option?: {
    locales?: string;
    options?: Intl.NumberFormatOptions;
    prefix?: string;
    suffix?: string;
  }
) => {
  if (!val) return " ";
  if (typeof val === "number") {
    const ret = (val as Number)?.toFormatZeroHyphen(
      option?.locales,
      option?.options
    );
    return `${option?.prefix ?? ""}${ret}${option?.suffix ?? ""}`;
  }
  return val;
};
