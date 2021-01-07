import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeService {
  today: Date;
  lastSunday: Date;

  constructor() {
    this.today = new Date();
    this.lastSunday = this.initializeLastSunday(this.today);
  }

  initializeLastSunday(today: Date): Date {
    const days = today.getDay();
    return new Date(new Date(today).setDate(today.getDate() - days));
  }

  get weekDayName() {
    var days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[this.today.getDay()];
  }

  get monthName() {
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
    return months[this.today.getMonth()];
  }
}
