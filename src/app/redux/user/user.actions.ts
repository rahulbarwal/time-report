import { createAction, props } from "@ngrx/store";
import { ELoginState, ILoggedInUserInfo, ILoggedInUserInfoState } from "../state/app.state";

const updateUserInfoStateAction = createAction(
    '[UserInfo] Update logged in user information',
    props<ILoggedInUserInfoState>()
);

const saveLoggedInUserInfoToDBAction = createAction(
    '[UserInfo] Save user info to DB',
    props<ILoggedInUserInfoState>()
);

const setUserVerifiedForSessionAction = createAction(
    '[UserInfo] Set session verification info to DB',
    props<{isUserVerifiedForThisSession: ELoginState}>()
);

export {
    updateUserInfoStateAction,
    saveLoggedInUserInfoToDBAction,
    setUserVerifiedForSessionAction
}
