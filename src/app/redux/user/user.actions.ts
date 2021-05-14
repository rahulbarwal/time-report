import { createAction, props } from "@ngrx/store";
import { ILoggedInUserInfo } from "../state/app.state";

const updateUserInfoAction = createAction(
    '[UserInfo] Update logged in user information',
    props<ILoggedInUserInfo>()
);

const saveLoggedInUserInfoToDBAction = createAction(
    '[UserInfo] Save user info to DB',
    props<ILoggedInUserInfo>()
);

export {
    updateUserInfoAction,
    saveLoggedInUserInfoToDBAction
}
