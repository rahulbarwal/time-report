import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-week-targets',
  templateUrl: './week-targets.component.html',
  styleUrls: ['./week-targets.component.scss'],
})
export class WeekTargetsComponent implements OnInit {
  @Input('mottoOfMonth') motto: string = 'Algorithms';

  constructor() {}

  ngOnInit(): void {}
}
