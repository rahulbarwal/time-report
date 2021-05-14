import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeService {
  static today = new Date();
  static lastSunday = new Date(
    new Date(DateTimeService.today).setDate(
      DateTimeService.today.getDate() - DateTimeService.today.getDay()
    )
  );
  static getDaysInMonth = (month?: number, year?: number) =>
    new Date(
      year || DateTimeService.today.getFullYear(),
      month || DateTimeService.today.getMonth(),
      0
    ).getDate();

  static isFirstWeek(weekStartDate: number) {
    return weekStartDate === 1;
  }

  static isLastWeek(weekEndDate: number) {
    return weekEndDate === DateTimeService.getDaysInMonth();
  }

  static getValidWeekDaysList(sundayDate: number): number[] {
    sundayDate = sundayDate;
    const maxDate = DateTimeService.getDaysInMonth();
    const minDate = 1;
    const isInRange = (curDate: number) => minDate <= curDate && curDate <= maxDate;
    const week: number[] = [
      isInRange(sundayDate) ? sundayDate : null,
      isInRange(sundayDate + 1) ? sundayDate + 1 : null,
      isInRange(sundayDate + 2) ? sundayDate + 2 : null,
      isInRange(sundayDate + 3) ? sundayDate + 3 : null,
      isInRange(sundayDate + 4) ? sundayDate + 4 : null,
      isInRange(sundayDate + 5) ? sundayDate + 5 : null,
      isInRange(sundayDate + 6) ? sundayDate + 6 : null,
    ].filter((val) => val !== null) as number[];
    return week;
  }

  static get todayWeekDayName() {
    return DateTimeService.getWeekDayNameFromDate(DateTimeService.today);
  }

  static get currentYear() {
    return DateTimeService.today.getFullYear();
  }

  static get currentMonthName() {
    return DateTimeService.getMonthNameDate(DateTimeService.today);
  }

  static getWeekDayNameFromDate(date: Date): string {
    var days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[date.getDay()];
  }

  static getCurrentWeeksDayFromDateNum(date: number) {
    return DateTimeService.getWeekDayNameFromDate(new Date((new Date()).setDate(date)));
  }

  static getMonthNameDate(date: Date): string {
    var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[date.getMonth()];
  }
}
