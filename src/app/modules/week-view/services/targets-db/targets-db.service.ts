import { Injectable } from '@angular/core';
import { EMPTY, throwError } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { isEmpty, mergeMap } from 'rxjs/operators';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { IMonthInfo, IGoalInfo } from '../../redux/state/goalsData.state';
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

  getMonthGoalsData(weekDates: string[]) {
    const monthName = this._dateTime.currentMonthName;
    let monthInfo: IMonthInfo;
    return this._firestore
      .getCollectionRef(this.yearPath)
      .doc(monthName)
      .get()
      .pipe(
        mergeMap((month_db) => {
          if (month_db.exists) {
            monthInfo = {
              mottoOfMonth: (month_db.data() as IMonthInfo).mottoOfMonth,
            };

            return this._firestore
              .getCollectionRef(`${this.yearPath}/${monthName}/goals`)
              .get();
          } else {
            return throwError('EmptyMonth');
          }
        }),
        mergeMap((goalsCollection) => {
          console.log(
            '🚀 ~ file: targets-db.service.ts ~ line 44 ~ TargetsDbService ~ mergeMap ~ goalsCollection',
            goalsCollection
          );

          let goals: IGoalInfo[] = [];
          goalsCollection.docs.forEach((doc) => {
            const goal: IGoalInfo = {
              id: doc.id,
              title: (doc.data() as IGoalInfo).title,
              perDayData: [],
            };
            const perDayData: {
              [key: string]: number;
            } = (doc.data() as {
              perDayData: {
                [key: string]: number;
              };
            }).perDayData;

            weekDates?.forEach(async (day) => {
              const found = perDayData.hasOwnProperty(day);
              if (found) {
                goal.perDayData?.push(perDayData[day]);
              } else {
                goal.perDayData?.push(null);
              }
            });
            goals.push(goal);
          });
          monthInfo.goals = goals;
          return of(monthInfo);
        })
      );
  }
}
