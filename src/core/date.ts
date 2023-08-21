interface DateConstructor {
  /** Dayjs型をDate型に変換する  */
  dayJsToDateYmd(me): Date;
  /** Date型の時間を落とす  */
  dateTimeToDate(me): Date | null;

  /** 指定日付未満 */
  toDayBefore(dt: Date): boolean;
  /** 指定日付以下 */
  toDayBeforeEq(dt: Date): boolean;
  /** 指定日超過 */
  toDayAfter(dt: Date): boolean;
  /** 指定日以降 */
  toDayAfterEq(dt: Date): boolean;
}
interface Date {
  /** 基準日を元に終了日まで日付の配列を返す */
  range(end: Date): Date[];
  /** 日本語の曜日を取得するする */
  toJPDayOfWeek(): string;
  /** 指定日付未満 */
  before(dt: Date): boolean;
  /** 指定日付以下 */
  beforeEq(dt: Date): boolean;
  /** 指定日超過 */
  after(dt: Date): boolean;
  /** 指定日以降 */
  afterEq(dt: Date): boolean;
  /** 4月から3月を年度と定義し、年度を取得する */
  getFiscalYears(): number;
  /** 該当年度の月配列を取得する */
  getFiscalYearsByMonthlyRange(): Date[];
  weekNumber(): number;
  /** 日付から第一週から第五週までの週番号とその該当日付を配列で取得する */
  weekArray(): {
    weekNumber: number;
    dateRange: Date[];
  }[];
}

Date.toDayBefore = (dt: Date) => {
  const today = Date.today();
  return today.before(dt);
};
Date.toDayBeforeEq = (dt: Date) => {
  const today = Date.today();
  return today.beforeEq(dt);
};
Date.toDayAfter = (dt: Date) => {
  const today = Date.today();
  return today.after(dt);
};
Date.toDayAfterEq = (dt: Date) => {
  const today = Date.today();
  return today.afterEq(dt);
};

Date.dayJsToDateYmd = (me) => {
  return new Date(me.year(), me.month(), me.day());
};
Date.dateTimeToDate = (me: Date) => {
  if (!me) return null;
  return new Date(me.getFullYear(), me.getMonth(), me.getDate());
};

const week: { [key: string]: string } = {
  Sun: "日",
  Mon: "月",
  Tue: "火",
  Wed: "水",
  Thu: "木",
  Fri: "金",
  Sat: "土",
};
Object.defineProperty(Date.prototype, "range", {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Date, end: Date) {
    const arr = new Array<Date>();
    let inc = this as Date;
    while (inc.beforeEq(end)) {
      arr.push(inc);
      inc = inc.addDays(1);
    }

    return arr;
  },
});
Object.defineProperty(Date.prototype, "toJPDayOfWeek", {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Date) {
    const enName = this.toFormat("E");
    return week[enName];
  },
});

Object.defineProperty(Date.prototype, "before", {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Date, dt: Date) {
    return this < dt;
  },
});
Object.defineProperty(Date.prototype, "beforeEq", {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Date, dt: Date) {
    return this <= dt;
  },
});
Object.defineProperty(Date.prototype, "after", {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Date, dt: Date) {
    return this > dt;
  },
});
Object.defineProperty(Date.prototype, "afterEq", {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Date, dt: Date) {
    return this >= dt;
  },
});
Object.defineProperty(Date.prototype, "getFiscalYears", {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Date) {
    const year = this.getFullYear();
    const month = this.getMonth() + 1;
    if (month <= 3) return year - 1;
    return year;
  },
});
Object.defineProperty(Date.prototype, "getFiscalYearsByMonthlyRange", {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Date) {
    const arr = new Array<Date>();
    const firstDate = new Date(`${this.getFiscalYears()}-04-01 00:00:00`);
    for (let i = 0; i < 12; i++) {
      arr.push(firstDate.addMonths(i));
    }
    return arr;
  },
});
Object.defineProperty(Date.prototype, "weekNumber", {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Date) {
    const date = this as Date;
    // 月の初日を取得します
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

    // 月の初日の曜日を取得します（0 - 日曜日、1 - 月曜日、...、6 - 土曜日）
    const firstDayOfWeek = firstDayOfMonth.getDay();

    // 月の初日が日曜日でない場合、初日を前の日曜日に調整します
    if (firstDayOfWeek !== 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - firstDayOfWeek);
    }

    // 指定した日付と月の初日との間の日数を求めます
    const diffInDays = Math.floor(
      (date.getTime() - firstDayOfMonth.getTime()) / (1000 * 60 * 60 * 24)
    );

    // 週数を求めます（1を加えるのは週数が1から始まるため）
    return Math.floor(diffInDays / 7) + 1;
  },
});

// weekArray
Object.defineProperty(Date.prototype, "weekArray", {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function (this: Date) {
    const date = this as Date;
    // 月の初日を取得します
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

    // 月の初日の曜日を取得します（0 - 日曜日、1 - 月曜日、...、6 - 土曜日）
    const firstDayOfWeek = firstDayOfMonth.getDay();

    // 月の初日が月曜日でない場合、次の月曜日を探す
    if (firstDayOfWeek !== 1) {
      for (let i = 1; i <= 7; i++) {
        const buff = firstDayOfMonth.addDays(i);
        if (buff.getDay() === 1) {
          firstDayOfMonth.setDate(firstDayOfMonth.getDate() + i);
          break;
        }
      }
    }

    const array = new Array<{
      weekNumber: number;
      dateRange: Date[];
    }>();
    for (let i = 0; i < 5; i++) {
      const begin = firstDayOfMonth.addDays(7 * i);
      const end = begin.addDays(6);

      if (begin.getMonth() !== firstDayOfMonth.getMonth()) {
        break;
      }
      array.push({
        weekNumber: i + 1,
        dateRange: begin.range(end),
      });
    }
    return array;
  },
});
