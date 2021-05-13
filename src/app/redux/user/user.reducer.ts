import { createReducer, on } from "@ngrx/store";
import { ILoggedInUserInfo } from "../state/app.state";
import { updateUserInfoAction } from "./user.actions";

const initialState: ILoggedInUserInfo = {
    name: '',
    email: '',
    phone: '',
    photoUrl: '',
}
export const loggedInUserReducer = createReducer(
    initialState,
    on(updateUserInfoAction, updateUserInfo)
);


function updateUserInfo(
    store: ILoggedInUserInfo,
    {
        email, phone, name, photoUrl
    }: {
        name: string,
        email: string,
        phone: string,
        photoUrl: string,
    }
): ILoggedInUserInfo {
    return { ...store, email, phone, name, photoUrl };
}