interface Array<T> {
  distinct(compare?: (s: T, t: T) => boolean): Array<T>;
  duplicate(
    target: Array<T>,
    comparer?: (source: T, target: T) => boolean
  ): Array<T>;
  merge(
    target: Array<T>,
    compare?: (source: T, target: T) => boolean
  ): Array<T>;

  write(s: string): Array<T>;
  writeLine(s: string): Array<T>;

  jsonEquales(target: Array<T>): boolean;

  pushRange(array: Array<T>): Array<T>;
}

Object.defineProperty(Array.prototype, "pushRange", {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Array<any>, array: Array<any>) {
    for (const each of array) {
      this.push(each);
    }
    return this;
  },
});

const newLine = `
`;
Object.defineProperty(Array.prototype, "writeLine", {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Array<any>, s: string) {
    this.push(s);
    this.push(newLine);
    return this;
  },
});
Object.defineProperty(Array.prototype, "write", {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Array<any>, s: string) {
    this.push(s);
    return this;
  },
});

Object.defineProperty(Array.prototype, "merge", {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (
    this: Array<any>,
    target: Array<any>,
    compare?: (source: any, target: any) => boolean
  ) {
    const getUniqueValue = (val) => {
      return JSON.stringify(val);
    };

    const newArray = new Array<any>();
    for (const each of target) {
      if (compare) {
        const item = this.firstOrDefault((x) => compare(x, each));
        if (!item) {
          newArray.push(each);
        }
      } else {
        const item = this.firstOrDefault(
          (x) => getUniqueValue(x) === getUniqueValue(each)
        );
        if (!item) {
          newArray.push(each);
        }
      }
    }
    return [...this, ...newArray];
  },
});

Object.defineProperty(Array.prototype, "distinct", {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Array<any>, compare?: (s: any, t: any) => boolean) {
    return this.filter(
      (value, index, self) =>
        self.findIndex((v) => (compare ? compare(v, value) : v === value)) ===
        index
    );
  },
});

Object.defineProperty(Array.prototype, "duplicate", {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (
    this: Array<any>,
    target: Array<any>,
    comparer?: (source: any, target: any) => boolean
  ) {
    const arr = new Array<any>();
    for (const me of this) {
      for (const you of target) {
        if (comparer) {
          if (comparer(me, you)) {
            arr.push(me);
            break;
          }
        } else {
          if (me === you) {
            arr.push(me);
            break;
          }
        }
      }
    }
    return arr;
  },
});

Object.defineProperty(Array.prototype, "jsonEquales", {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Array<any>, target: Array<any>) {
    this.sort();
    target.sort();
    const thisJson = JSON.stringify(this ?? []);
    const actualJson = JSON.stringify(target ?? []);
    return thisJson === actualJson;
  },
});
