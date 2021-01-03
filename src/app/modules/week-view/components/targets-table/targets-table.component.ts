import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-targets-table',
  templateUrl: './targets-table.component.html',
  styleUrls: ['./targets-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TargetsTableComponent implements OnInit {
  @Input('goalsList') goalsList: { title: string; id: string }[] = [
    { title: '1st goal', id: 'asd' },
    { title: '2nd goal', id: 'dsf' },
    { title: '3rd goal', id: 'asd' },
    { title: '4th Goal', id: 'dsf' },
  ];
  @Input('tableTitles') headings: string[] = [
    'Goals',
    '4th Jan',
    '5th Jan',
    '6th Jan',
    '7th Jan',
    '8th Jan',
  ];
  @Input('goalData') goalData: Map<string, number[]> | null = null;

  constructor() {
    this.goalData = new Map<string, number[]>();
    this.goalData.set('dsf', [4, 3, 2]);
    this.goalData.set('asd', [4, 3, 2]);
  }

  ngOnInit(): void {}

  getGoalsData(goalID: string) {
    try {
      return this.goalData?.get(goalID);
    } catch (error) {
      console.log(
        '🚀 ~ file: targets-table.component.ts ~ line 37 ~ TargetsTableComponent ~ getGoalsData ~ error',
        error
      );
      return [];
    }
  }
}
