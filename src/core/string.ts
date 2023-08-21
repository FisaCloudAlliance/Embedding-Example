interface String {
  toNumber(validate?: (val) => boolean): number;
}
Object.defineProperty(String.prototype, "toNumber", {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: string, validate?: (val) => boolean) {
    if (String.isNullOrWhiteSpace(this)) return null;
    if (validate && !validate(this)) return null;
    return Number(this);
  },
});
interface StringConstructor {
  format(format: string, ...args: any[]): string;
}
String.format = function (format: string, ...args: any[]) {
  return format.replace(/\{(\d+)\}/g, (m, k) => {  // m="{0}", k="0"
      return args[k];
  });
}