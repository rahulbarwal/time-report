import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IGoalInfo } from '../../redux/state/goalsData.state';

@Component({
  selector: 'app-targets-table',
  templateUrl: './targets-table.component.html',
  styleUrls: ['./targets-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TargetsTableComponent {
  private _goalsData!: IGoalInfo[];
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

  allowedHours = [1, 2, 3, 4];

  indexForLoadingSpinner: { hrIndex: number; goalID: string } | null = null;

  constructor(private _changeDetector: ChangeDetectorRef) {}

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
