import { Component, Input, OnInit } from '@angular/core';
import { MonthInfoModel } from '../../models/month-info.model';
import { DateTimeService } from '../../services/date-time/date-time.service';
import { TargetsDbService } from '../../services/targets-db/targets-db.service';

@Component({
  selector: 'app-week-targets',
  templateUrl: './week-targets.component.html',
  styleUrls: ['./week-targets.component.scss'],
})
export class WeekTargetsComponent implements OnInit {
  monthInfo: MonthInfoModel | null = null;

  constructor(private _targetDB: TargetsDbService) {}

  ngOnInit(): void {
    this.getMonthGoalsDataFromDB();
  }

  async getMonthGoalsDataFromDB() {
    this._targetDB.getMonthGoalsData().subscribe((monthInfo) => {
      this.monthInfo = monthInfo;
    });
  }
}
