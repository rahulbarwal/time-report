import {
  ChangeDetectionStrategy,
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
  @Input() goalsData!: IGoalInfo[];
  @Input() headings!: string[];
  @Input() currentDayIndex!: number;

  @Output() setHoursForGoal = new EventEmitter<{
    goalID: string;
    hrs: number;
  }>();

  allowedHours = [2, 3, 4, 5];

  constructor() {}

  hoursClick(goalID: string, hrs: number) {
    this.setHoursForGoal.emit({
      goalID,
      hrs: hrs,
    });
  }
}
