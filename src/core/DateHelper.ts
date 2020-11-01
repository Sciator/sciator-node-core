/** create twodigit string from number */
const d = (n: number, pad: number = 2) => n.toString().padStart(pad, "0");

export class DateHelper {
  /** return date in format YYYY_MM_DD */
  public static toDateString(date: Date) {
    return `${d(date.getFullYear())}_${d(date.getMonth() + 1)}_${d(date.getDate())}`;
  }

  /** return time in format HH_mm_SS(_sss when withMillis true) */
  public static toTimeString(date: Date, withMillis: boolean = true) {
    return `${d(date.getHours())}_${d(date.getMinutes())}_${d(date.getSeconds())}`
      + ((withMillis && "_" + d(date.getMilliseconds(), 3)) || "");
  }

  /** return time in format YYYY_MM_DD__HH_mm_SS(_sss when withMillis true) */
  public static toDateTimeString(date: Date, withMillis: boolean = true) {
    return DateHelper.toDateString(date) + "__" + DateHelper.toTimeString(date, withMillis);
  }

  /** parse date from formats made by this helper class */
  public static fromString(str: string): Date {
    const spl = str.split("_").map(x => Number.parseInt(x, 10));

    if (spl[0] <= 24) {
      return new Date(1, 0, 0, spl[0], spl[1], spl[2], spl[3] || 0);
    } else {
      // moth is index not real month
      return new Date(spl[0], spl[1] - 1, spl[2], spl[3] || 0, spl[4] || 0, spl[5] || 0, spl[6] || 0);
    }
  }
}

/** time string for current program run */
export const TIMESTAMP_PROGRAM_RUN = DateHelper.toDateTimeString(new Date(), false);
