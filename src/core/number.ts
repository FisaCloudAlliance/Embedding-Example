interface Number {
  toFormatZeroHyphen(
    locales?: string,
    options?: Intl.NumberFormatOptions
  ): string;
  round(decimalPoint: number): number;
}
Object.defineProperty(Number.prototype, "toFormatZeroHyphen", {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (
    this: number,
    locales: string = "ja-JP",
    options: Intl.NumberFormatOptions = { style: "decimal" }
  ) {
    if (!this) return " － ";
    return this.toFormat(locales, options);
  },
});
Object.defineProperty(Number.prototype, "round", {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (
    this: number,
    decimalPoint: number,
  ) {
    if (!this) return 0;
    return Number(this.toFixed(decimalPoint));
  },
});
