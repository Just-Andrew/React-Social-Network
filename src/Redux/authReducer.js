import { headerAPI, authAPI, securityAPI } from '../API/api'

/*Action Creators */
const setCurrentUserInfo = data => ({ type: 'SET-CURRENT-USER-INFO', data })
const setCurrentUserAvatar = avatar => ({ type: 'SET-CURRENT-USER-AVATAR', avatar })
const setAuthStatus = () => ({ type: 'SET-AUTH-STATUS' })
export const setError = msg => ({ type: 'SET-ERROR', msg })
export const setCaptchaUrl = url => ({ type: 'SET-CAPTCHA-URL', url })
/*Thunks Creators*/
export const authMe = () => async dispatch => {
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

export const logIn = (email, password) => async dispatch => {
    let log = await authAPI.logIn(email, password)
    if (log.data.resultCode === 0) {
        dispatch(authMe())
    }
    else if (log.data.messages[0] === 'Incorrect anti-bot symbols') {
        dispatch(getCaptcha())
        dispatch(setError(log.data.messages[0]))
    }
    else {
        dispatch(setError(log.data.messages[0]))
    }
}

export const logOut = () => dispatch => {
    dispatch(setCurrentUserInfo({
        myId: undefined,
        login: null,
        email: null,
        isAuth: false,
    }))
    dispatch(setCurrentUserAvatar(null))
    authAPI.logOut()
}

export const getCaptcha = () => async dispatch => {
    let res = await securityAPI.getCaptcha()
    dispatch(setCaptchaUrl(res.data.url))
}


let InitialState = {
    myId: undefined,
    login: null,
    email: null,
    avatar: null,
    isAuth: false,
    error: null,
    captchaImg: null
}

let authReducer = (state = InitialState, action) => {
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
    }
    return state
}
export default authReducer;