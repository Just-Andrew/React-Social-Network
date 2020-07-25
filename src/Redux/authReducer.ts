import { headerAPI, authAPI, securityAPI } from '../API/api'

/* Action Types */
type setCurrentUserInfoActionType = {
    type: 'SET-CURRENT-USER-INFO'
    data: object
}

type setCurrentUserAvatarActionType = {
    type: 'SET-CURRENT-USER-AVATAR'
    avatar: string | null
}

type setAuthStatusActionType = { type: 'SET-AUTH-STATUS' }

type setErrorActionType = {
    type: 'SET-ERROR'
    msg: string
}

type setCaptchaUrlActionType = {
    type: 'SET-CAPTCHA-URL'
    url: string
}


/*Action Creators */
const setCurrentUserInfo = (data: object): setCurrentUserInfoActionType => ({ type: 'SET-CURRENT-USER-INFO', data })
const setCurrentUserAvatar = (avatar: string | null): setCurrentUserAvatarActionType => ({ type: 'SET-CURRENT-USER-AVATAR', avatar })
const setAuthStatus = (): setAuthStatusActionType => ({ type: 'SET-AUTH-STATUS' })
export const setError = (msg: string): setErrorActionType => ({ type: 'SET-ERROR', msg })
export const setCaptchaUrl = (url: string): setCaptchaUrlActionType => ({ type: 'SET-CAPTCHA-URL', url })

/*Thunks Creators*/
export const authMe = () => async (dispatch: Function) => {
    let res = await headerAPI.getAuthorizedPersonData()
    dispatch(setCurrentUserInfo({
        myId: res.data.id,
        login: res.data.login,
        email: res.data.email,
    }))

    if (res.data.id !== undefined) {
        dispatch(setAuthStatus())
        let avatar = await headerAPI.getAvatar(res.data.id)
        dispatch(setCurrentUserAvatar(avatar))
    }
}

export const logIn = (data: any) => async (dispatch: Function) => {
    let log = await authAPI.logIn(data)
    if (log.data.resultCode === 0) {
        dispatch(authMe())
    }
    else if (log.data.messages[0] === 'Incorrect anti-bot symbols' || data.requiresCaptcha) {
        dispatch(getCaptcha())
        dispatch(setError(log.data.messages[0]))
    }
    else {
        dispatch(setError(log.data.messages[0]))
    }
}

export const logOut = () => (dispatch: Function) => {
    dispatch(setCurrentUserInfo({
        myId: null,
        login: null,
        email: null,
        isAuth: false,
    }))
    dispatch(setCurrentUserAvatar(null))
    authAPI.logOut()
}

export const getCaptcha = () => async (dispatch: Function) => {
    let res = await securityAPI.getCaptcha()
    dispatch(setCaptchaUrl(res.data.url))
}

type InitialStateType = {
    myId: number | null
    login: null | string
    email: null | string
    avatar: null | string
    isAuth: boolean
    error: null | string
    captchaImg: null | string
}

let InitialState: InitialStateType = {
    myId: null,
    login: null,
    email: null,
    avatar: null,
    isAuth: false,
    error: null,
    captchaImg: null
}

let authReducer = (state = InitialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET-CURRENT-USER-INFO':
            return {
                ...state,
                myId: action.data.myId,
                login: action.data.login,
                email: action.data.email,
                isAuth: action.data.isAuth
            }

        case 'SET-CURRENT-USER-AVATAR':
            return { ...state, avatar: action.avatar }

        case 'SET-AUTH-STATUS':
            return { ...state, isAuth: true }

        case 'SET-ERROR':
            return { ...state, error: action.msg }

        case 'SET-CAPTCHA-URL':
            return { ...state, captchaImg: action.url }

        default:
            return state
    }
}
export default authReducer