export const setCurrentUserInfo = data => ({ type: 'SET-CURRENT-USER-INFO', data })
export const setCurrentUserAvatar = avatar => ({ type: 'SET-CURRENT-USER-AVATAR', avatar })
export const setAuthStatus = () => ({ type: 'SET-AUTH-STATUS' })

let InitialState = {
    id: null,
    login: null,
    email: null,
    avatar: null,
    isAuth: false
}

let headerReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'SET-CURRENT-USER-INFO':
            return {
                ...state,
                id: action.data.id,
                login: action.data.login,
                email: action.data.email,
            }

        case 'SET-CURRENT-USER-AVATAR':
            return { ...state, avatar: action.avatar }

        case 'SET-AUTH-STATUS':
            return { ...state, isAuth: true }
    }
    return state
}
export default headerReducer;