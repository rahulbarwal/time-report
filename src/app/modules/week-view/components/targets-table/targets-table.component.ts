import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IGoalInfo } from '../../redux/state/goalsData.state';

@Component({
  selector: 'app-targets-table',
  templateUrl: './targets-table.component.html',
  styleUrls: ['./targets-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TargetsTableComponent implements OnInit {
  @Input() goalsData!: IGoalInfo[];

  @Input() headings!: string[];

  constructor() {}

  ngOnInit(): void {}
}
