import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private _firestore: AngularFirestore) {}

  getCollectionRef(path: string) {
    if (path === null) {
      throw new Error('🐲 Collection path can not be empty.');
    }
    return this._firestore.collection(path);
  }
}
