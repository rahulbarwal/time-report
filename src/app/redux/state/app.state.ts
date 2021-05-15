interface ILoggedInUserInfo {
    id: string;
    name: string;
    email: string;
    phone: string;
    photoUrl: string;
}

enum ELoginState {
    WAITING,
    LOGGEDIN,
    LOGGGEDOUT
}

interface ILoggedInUserInfoState extends ILoggedInUserInfo {
    isUserVerifiedForThisSession: ELoginState;
}
interface IAppState {
    user: ILoggedInUserInfoState
}

const userInfoSelector = (state: IAppState) => state.user;
const sessionVerifiedSelector = (state: IAppState) => state.user.isUserVerifiedForThisSession;

export { IAppState, ILoggedInUserInfo, ILoggedInUserInfoState, ELoginState, userInfoSelector, sessionVerifiedSelector };
