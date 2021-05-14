import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { UsersDbService } from "src/app/modules/week-view/services/users-db/users-db.service";
import { ILoggedInUserInfo } from "../state/app.state";
import { saveLoggedInUserInfoToDBAction, updateUserInfoAction } from "./user.actions";

@Injectable()
export class UserEffects {
    constructor(
        private _actions$: Actions,
        private _userDB: UsersDbService) { };

    @Effect()
    saveUserToDB$ = this._actions$.pipe(
        ofType(saveLoggedInUserInfoToDBAction),
        switchMap(action => {
            const toDB = {
                id: action.id,
                name: action.name,
                email: action.email,
                phone: action.phone,
                photoUrl: action.photoUrl
            };
            if (action.id) {
                return this._userDB
                    .addUpdateUserLoggedInInfo(toDB)
                    .pipe(map(_ => toDB))
            }
            return of(toDB)
        }),
        map(userInfo => updateUserInfoAction(userInfo))
    );
}