import { headerAPI, authAPI } from '../API/api'

/*Action Creators */
const setCurrentUserInfo = data => ({ type: 'SET-CURRENT-USER-INFO', data })
const setCurrentUserAvatar = avatar => ({ type: 'SET-CURRENT-USER-AVATAR', avatar })
const setAuthStatus = () => ({ type: 'SET-AUTH-STATUS' })
const setError = (val) => ({ type: 'SET-ERROR', val })

/*Thunks Creators*/
export const authMe = () => dispatch => {
    headerAPI.getAuthorizedPersonData()
        .then(res => {
            dispatch(setCurrentUserInfo({
                myId: res.data.id,
                login: res.data.login,
                email: res.data.email,
            }))

            if (res.data.id !== undefined) {
                dispatch(setAuthStatus())
                headerAPI.getAvatar(res.data.id)
                    .then(avatar => {
                        dispatch(setCurrentUserAvatar(avatar))
                    })
            }
        })
}

export const logIn = (email, password) => dispatch => {
    authAPI.logIn(email, password)
        .then((res2) => { console.log(res2.data)
            headerAPI.getAuthorizedPersonData()
                .then(res => {
                    if (res.resultCode === 0) {
                        dispatch(setError(false))
                        dispatch(setCurrentUserInfo({
                            myId: res.data.id,
                            login: res.data.login,
                            email: res.data.email,
                            isAuth: true
                        }))
                    } else {
                        dispatch(setError(true))
                    }
                })
        })
}

export const logOut = () => dispatch => {
    authAPI.logOut()
    dispatch(setCurrentUserInfo({
        myId: null,
        login: null,
        email: null,
        isAuth: false
    }))
}



let InitialState = {
    myId: null,
    login: null,
    email: null,
    avatar: null,
    isAuth: false,
    error: false
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
            if (action.val) return { ...state, error: 'Email or password is wrong' }
            else return { ...state, error: false }
    }
    return state
}
export default authReducer;