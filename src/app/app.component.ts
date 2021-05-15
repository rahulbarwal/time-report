import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ELoginState, IAppState, sessionVerifiedSelector } from './redux/state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoggedIn$: Observable<ELoginState>;
  LOGGED_OUT_STATE = ELoginState.LOGGGEDOUT;
  constructor(private _store: Store<IAppState>) {
    this.isLoggedIn$ = this._store.select(sessionVerifiedSelector);
  }
}
