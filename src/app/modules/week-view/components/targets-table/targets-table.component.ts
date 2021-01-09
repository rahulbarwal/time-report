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
  @Input('goalsData') goalsData: IGoalInfo[] | undefined = [];

  @Input('tableTitles') headings: string[] = [
    'Goals',
    '4th Jan',
    '5th Jan',
    '6th Jan',
    '7th Jan',
    '8th Jan',
  ];

  constructor() {}

  ngOnInit(): void {}
}
