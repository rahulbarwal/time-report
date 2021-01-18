import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-goals-list',
  templateUrl: './goals-list.component.html',
  styleUrls: ['./goals-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalsListComponent {
  @Input() goalsFormArray!: FormArray;
  newGoal = new FormControl('');

  constructor(private _formBuilder: FormBuilder) {}
  addNewGoal() {
    this.goalsFormArray.push(
      this._formBuilder.control(this.newGoal.value || '')
    );
    this.newGoal.setValue('', { onlySelf: true });
  }

  deleteGoal(index: number) {
    this.goalsFormArray.removeAt(index);
  }
}
