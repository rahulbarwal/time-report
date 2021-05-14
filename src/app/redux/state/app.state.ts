interface ILoggedInUserInfo {
    id: string;
    name: string;
    email: string;
    phone: string;
    photoUrl: string;
}
interface IAppState {
    user: ILoggedInUserInfo
}

const userInfoSelector = (state: IAppState) => state.user;

export { IAppState, ILoggedInUserInfo, userInfoSelector };
