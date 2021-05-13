import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { IAppState, ILoggedInUserInfo, userInfoSelector } from 'src/app/redux/state/app.state';
import { updateUserInfoAction } from 'src/app/redux/user/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userInfo$?: Observable<ILoggedInUserInfo>;
  userState?: firebase.default.User | null;

  constructor(public _afAuth: AngularFireAuth, private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this.checkIfAlreadyLoggedIn();
    this.monitorAuthStateChanges();

    this.userInfo$ = this._store.select(userInfoSelector);
  }

  checkIfAlreadyLoggedIn() {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      this.userState = JSON.parse(userInfo);
    }
  }

  dipatchLoggedInUser(userInfo: firebase.default.User | null) {
    if (userInfo) {
      this._store.dispatch(updateUserInfoAction({
        name: userInfo.displayName || '',
        email: userInfo.email || '',
        phone: userInfo.phoneNumber || '',
        photoUrl: userInfo.photoURL || '',
      }));
    } else {
      this._store.dispatch(updateUserInfoAction({
        name: '',
        email: '',
        phone: '',
        photoUrl: '',
      }));

    }
  }

  monitorAuthStateChanges() {
    this._afAuth.authState.subscribe((user: firebase.default.User | null) => {
      if (user) {
        this.userState = user as firebase.default.User;
        localStorage.setItem('user', JSON.stringify(this.userState));
      } else {
        this.userState = null;
        localStorage.removeItem('user');
      }
      this.dipatchLoggedInUser(this.userState);
    })
  }

  doGoogleLogin() {
    let provider = new firebase.default.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this._afAuth
      .signInWithPopup(provider);
  }

  logoutUser() {
    this._afAuth.signOut();
  }
}
