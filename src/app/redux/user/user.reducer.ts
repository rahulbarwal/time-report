import { createReducer, on } from "@ngrx/store";
import { ILoggedInUserInfo } from "../state/app.state";
import { updateUserInfoAction } from "./user.actions";

const initialState: ILoggedInUserInfo = {
    name: '',
    email: '',
    phone: '',
    photoUrl: '',
    id: ''
}
export const loggedInUserReducer = createReducer(
    initialState,
    on(updateUserInfoAction, updateUserInfo)
);


function updateUserInfo(
    store: ILoggedInUserInfo,
    {
        email, phone, name, photoUrl, id
    }: {
        name: string,
        email: string,
        phone: string,
        photoUrl: string,
        id: string,
    }
): ILoggedInUserInfo {
    return { ...store, email, phone, name, photoUrl, id };
}