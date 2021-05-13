import { createAction, props } from "@ngrx/store";

const updateUserInfoAction = createAction(
    '[UserInfo] Update logged in user information',
    props<{
        name: string
        email: string
        phone: string,
        photoUrl: string
    }>()
);

export {
    updateUserInfoAction
}
