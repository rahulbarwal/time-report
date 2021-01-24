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

  static getValidWeekDaysList(sundayDate: number): number[] {
    sundayDate = sundayDate;
    const maxDate = DateTimeService.getDaysInMonth();
    const week: number[] = [
      sundayDate,
      sundayDate + 1 <= maxDate ? sundayDate + 1 : null,
      sundayDate + 2 <= maxDate ? sundayDate + 2 : null,
      sundayDate + 3 <= maxDate ? sundayDate + 3 : null,
      sundayDate + 4 <= maxDate ? sundayDate + 4 : null,
      sundayDate + 5 <= maxDate ? sundayDate + 5 : null,
      sundayDate + 6 <= maxDate ? sundayDate + 6 : null,
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
