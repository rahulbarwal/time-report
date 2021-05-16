import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IGoalInfo } from '../../redux/goalsData.state';

@Component({
  selector: 'app-targets-table',
  templateUrl: './targets-table.component.html',
  styleUrls: ['./targets-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TargetsTableComponent {
  private _goalsData!: IGoalInfo[];
  @Input() currentWeek!: number[];
  @Input() set goalsData(val: IGoalInfo[]) {
    this._goalsData = val;
    this.indexForLoadingSpinner = null;
  }
  get goalsData() {
    return this._goalsData;
  }

  @Input() headings!: string[];
  @Input() currentDayIndex!: number;

  @Output() setHoursForGoal = new EventEmitter<{
    goalID: string;
    hrs: number;
    dayIndex: number;
  }>();

  allowedHours = [0, 1, 2, 3, 4];

  indexForLoadingSpinner: { hrIndex: number; goalID: string } | null = null;

  constructor(private _changeDetector: ChangeDetectorRef) {}

  getHrColorClass(hr?: number, prevDayHr?: number) {
    if (hr && hr > 0) {
      if (!prevDayHr) {
        return '';
      }
      const diff = hr - prevDayHr;
      if (diff > 0) {
        switch (diff) {
          case 1:
            return 'text-green-600';
          case 2:
            return 'text-green-700';
          case 3:
            return 'text-green-800';
          case 4:
            return 'text-green-900';
        }
      } else {
        switch (Math.abs(diff)) {
          case 1:
            return 'text-yellow-600';
          case 2:
            return 'text-red-700';
          case 3:
            return 'text-red-800';
          case 4:
            return 'text-red-900';
        }
      }
    }
    return 'text-gray-400';
  }

  hoursClick(goalID: string, hrs: number, dayIndex: number, hrIndex: number) {
    this.indexForLoadingSpinner = { hrIndex, goalID };
    this._changeDetector.detectChanges();
    this.setHoursForGoal.emit({
      goalID,
      dayIndex,
      hrs: hrs,
    });
  }
}
