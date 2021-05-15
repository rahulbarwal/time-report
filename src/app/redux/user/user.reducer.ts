import { createReducer, on } from "@ngrx/store";
import { ELoginState, ILoggedInUserInfo, ILoggedInUserInfoState } from "../state/app.state";
import { updateUserInfoStateAction, setUserVerifiedForSessionAction } from "./user.actions";

const initialState: ILoggedInUserInfoState = {
    name: '',
    email: '',
    phone: '',
    photoUrl: '',
    id: '',
    isUserVerifiedForThisSession: ELoginState.WAITING
}
export const loggedInUserReducer = createReducer(
    initialState,
    on(updateUserInfoStateAction, updateUserInfo),
    on(setUserVerifiedForSessionAction, setUserVerified),
);


function updateUserInfo(
    store: ILoggedInUserInfoState,
    payload: ILoggedInUserInfoState
): ILoggedInUserInfoState {
    return {
        ...store,
        ...payload
    };
}

function setUserVerified(store: ILoggedInUserInfoState,
    { isUserVerifiedForThisSession }: { isUserVerifiedForThisSession: ELoginState }): ILoggedInUserInfoState {
    return { ...store, isUserVerifiedForThisSession };
}