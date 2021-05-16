import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { IGoalInfo, IMonthInfo } from '../../redux/goalsData.state';
import { DateTimeService } from '../date-time/date-time.service';

@Injectable()
export class TargetsDbService {
  getUserTargetsPath(year: number, userId: string) {
    return `targets-${year}/${userId}/yearlyData`;
  }

  constructor(private _firestore: FirestoreService) { }

  isMonthGoalsStored(userId: string, year?: number, monthName?: string) {
    year = year || DateTimeService.currentYear;
    monthName = monthName || DateTimeService.currentMonthName;
    return this._firestore
      .getCollectionRef(this.getUserTargetsPath(year, userId))
      .doc(monthName)
      .get()
      .pipe(map((val) => val.exists));
  }

  getMonthGoalsData({
    userId,
    year,
    monthName,
    weekStartDate,
  }: {
    userId: string
    year?: number;
    monthName?: string;
    weekStartDate: number;
  }) {
    year = year || DateTimeService.currentYear;
    monthName = monthName || DateTimeService.currentMonthName;
    const weekDates = DateTimeService.getValidWeekDaysList(weekStartDate);
    const yearPath = this.getUserTargetsPath(year, userId);

    let monthInfo: IMonthInfo;
    return this._firestore
      .getCollectionRef(yearPath)
      .doc(monthName)
      .get()
      .pipe(
        mergeMap((month_db) => {
          if (month_db.exists) {
            monthInfo = {
              mottoOfMonth: (month_db.data() as IMonthInfo).mottoOfMonth,
              goals: [],
            };

            return this._firestore
              .getCollectionRef(`${yearPath}/${monthName}/goals`)
              .get();
          } else {
            return throwError('EmptyMonth');
          }
        }),
        mergeMap((goalsCollection) => {
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
              if (day !== null) {
                const found = perDayData?.hasOwnProperty(day);
                if (found) {
                  goal.perDayData?.push(perDayData[day]);
                } else {
                  goal.perDayData?.push(null);
                }
              }
            });
            goals.push(goal);
          });
          monthInfo.goals = goals;
          return of(monthInfo);
        })
      );
  }

  updateGoalHours({
    year,
    monthName,
    userId,
    goalID,
    day,
    hrs,
  }: {
    year?: number;
    monthName?: string;
    userId: string;
    goalID: string;
    day: number;
    hrs: number;
  }) {
    year = year || DateTimeService.currentYear;
    monthName = monthName || DateTimeService.currentMonthName;
    const objToUpdate: { [key: string]: number } = {};
    objToUpdate[`perDayData.${day}`] = hrs;
    return this._firestore
      .getCollectionRef(`${this.getUserTargetsPath(year, userId)}/${monthName}/goals`)
      .doc(goalID)
      .update(objToUpdate);
  }

  //#region Save Month data
  saveMonthGoals({
    year,
    monthName,
    userId,
    motto,
    goals,
  }: {
    year: number;
    monthName: string;
    userId: string;
    motto: string;
    goals: string[];
  }) {
    try {
      const targetRef = this._firestore
        .getCollectionRef(`${this.getUserTargetsPath(year, userId)}`)
        .doc(monthName).ref;
      const batch = this._firestore.batchInstance;
      batch.set(targetRef, { mottoOfMonth: motto });

      goals.forEach((goal) => {
        targetRef.collection('goals').add({
          title: goal,
          perDayData: [],
        });
      });
      batch.commit();
      return of(true);
    } catch (error) {
      return throwError('SaveFail');
    }
  }
  //#endregion
}
