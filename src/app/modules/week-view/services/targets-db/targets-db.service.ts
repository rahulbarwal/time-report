import { Injectable } from '@angular/core';
import { validateEventsArray } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { GoalInfoModel, MonthInfoModel } from '../../models/month-info.model';
import { DateTimeService } from '../date-time/date-time.service';

@Injectable()
export class TargetsDbService {
  get yearPath() {
    const year = this._dateTime.today.getFullYear();
    return `targets-${year}`;
  }

  constructor(
    private _firestore: FirestoreService,
    private _dateTime: DateTimeService
  ) {}

  async getMonthGoalsData(weekDates?: string[]) {
    weekDates = ['1', '3', '4'];
    const monthName = this._dateTime.monthName;
    const month_db = await this._firestore
      .getCollectionRef(this.yearPath)
      .doc(monthName)
      .get()
      .toPromise();

    const monthInfo: MonthInfoModel = {
      mottoOfMonth: (month_db.data() as MonthInfoModel).mottoOfMonth,
    };

    const goalsCollection = await this._firestore
      .getCollectionRef(`${this.yearPath}/${monthName}/goals`)
      .get()
      .toPromise();
    let goals: GoalInfoModel[] = [];
    goalsCollection.docs.forEach((doc) => {
      const goal: GoalInfoModel = {
        id: doc.id,
        title: (doc.data() as GoalInfoModel).title,
        perDayData: [],
      };

      weekDates?.forEach(async (day) => {
        const dayData = await doc.ref.collection('per-day-data').doc(day).get();
        goal.perDayData?.push((dayData.data() as { hours: number }).hours);
      });
      goals.push(goal);
    });
    monthInfo.goals = goals;
    return monthInfo;
  }
}
