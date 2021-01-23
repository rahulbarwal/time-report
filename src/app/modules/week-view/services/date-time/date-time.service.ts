import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeService {
  static today = new Date();
  static lastSunday = new Date(
    new Date(DateTimeService.today).setDate(
      DateTimeService.today.getDate() - DateTimeService.today.getDay()
    )
  );

  static getValidWeekDaysList(sundayDate: number): (number | null)[] {
    sundayDate = sundayDate;
    const getDaysInMonth = (month: number, year: number) =>
      new Date(year, month, 0).getDate();
    const maxDate = getDaysInMonth(
      DateTimeService.today.getMonth(),
      DateTimeService.today.getFullYear()
    );
    return [
      sundayDate,
      sundayDate + 1 <= maxDate ? sundayDate + 1 : null,
      sundayDate + 2 <= maxDate ? sundayDate + 2 : null,
      sundayDate + 3 <= maxDate ? sundayDate + 3 : null,
      sundayDate + 4 <= maxDate ? sundayDate + 4 : null,
      sundayDate + 5 <= maxDate ? sundayDate + 5 : null,
      sundayDate + 6 <= maxDate ? sundayDate + 6 : null,
    ];
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
