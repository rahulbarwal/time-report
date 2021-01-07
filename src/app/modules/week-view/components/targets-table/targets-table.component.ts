import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { GoalInfoModel } from '../../models/month-info.model';

@Component({
  selector: 'app-targets-table',
  templateUrl: './targets-table.component.html',
  styleUrls: ['./targets-table.component.scss'],
})
export class TargetsTableComponent implements OnInit, OnChanges {
  @Input('goalsData') goalsData: GoalInfoModel[] = [];

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

  ngOnChanges(changes: SimpleChanges) {
    console.log(
      '🚀 ~ file: targets-table.component.ts ~ line 32 ~ TargetsTableComponent ~ ngOnChanges ~ changes',
      changes
    );
  }
}
