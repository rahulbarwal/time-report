import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeService {
  today: Date;
  lastSunday: Date;

  constructor() {
    this.today = new Date();
    this.today = new Date(new Date(this.today).setDate(this.today.getDate()));

    this.lastSunday = this.initializeLastSunday(this.today);
  }

  initializeLastSunday(today: Date): Date {
    const days = today.getDay();
    return new Date(new Date(today).setDate(today.getDate() - days));
  }

  getValidWeekDaysList(): (number | null)[] {
    const sundayDate = this.lastSunday.getDate();
    const getDaysInMonth = (month: number, year: number) =>
      new Date(year, month, 0).getDate();
    const maxDate = getDaysInMonth(
      this.today.getMonth(),
      this.today.getFullYear()
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

  get todayWeekDayName() {
    return DateTimeService.getWeekDayNameFromDate(this.today);
  }

  get currentYear() {
    return this.today.getFullYear();
  }

  get currentMonthName() {
    return DateTimeService.getMonthNameDate(this.today);
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
