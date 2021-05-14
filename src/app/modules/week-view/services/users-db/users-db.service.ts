import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { map } from 'rxjs/operators';
import { ILoggedInUserInfo } from 'src/app/redux/state/app.state';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class UsersDbService {

  usersCollectionRef = 'users';

  constructor(private _firestore: FirestoreService) { }

  addUpdateUserLoggedInInfo(userInfo: ILoggedInUserInfo) {
    const userDocRef = this._firestore
      .getCollectionRef(this.usersCollectionRef)
      .doc(userInfo.id);

    return userDocRef
      .get()
      .pipe(map(userDoc => {
        if (userDoc.exists) {
          userDocRef.update({
            lastActive: firebase.default.firestore.FieldValue.serverTimestamp(),
          })
        } else {
          userDocRef.set({
            ...userInfo,
            lastActive: firebase.default.firestore.FieldValue.serverTimestamp(),
            accountCreated: firebase.default.firestore.FieldValue.serverTimestamp()
          })
        }
      }));
  }
}
