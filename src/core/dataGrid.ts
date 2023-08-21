import { GridValueFormatterParams } from "@mui/x-data-grid";

declare global {
  interface DataGridConstructor {
    toFormatZeroEmpty(
      params: GridValueFormatterParams<any>,
      unit?: string
    ): any;
    toFormatZeroHyphen(
      params: GridValueFormatterParams<any>,
      unit?: string
    ): any;
    toFormatDateAndDayOfWeek(params: GridValueFormatterParams<any>): any;
  }
  var DataGridUtil: DataGridConstructor;
}
window.DataGridUtil = {} as any;

DataGridUtil.toFormatZeroEmpty = (
  params: GridValueFormatterParams<any>,
  unit: string = ""
) => {
  const { value } = params;
  return `${Object.toFormatZeroEmpty(value)}${value ? unit : ""}`;
};

DataGridUtil.toFormatZeroHyphen = (
  params: GridValueFormatterParams<any>,
  unit: string = ""
) => {
  const { value } = params;
  return `${Object.toFormatZeroHyphen(value)}${value ? unit : ""}`;
};

DataGridUtil.toFormatDateAndDayOfWeek = (
  params: GridValueFormatterParams<any>
) => {
  const { value } = params;
  return `${value.toFormat("M月dd日")}(${value.toJPDayOfWeek()})`;
};
