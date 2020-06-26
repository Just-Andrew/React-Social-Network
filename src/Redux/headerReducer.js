import { headerAPI } from '../API/api'

/*Action Creators */
const setCurrentUserInfo = data => ({ type: 'SET-CURRENT-USER-INFO', data })
const setCurrentUserAvatar = avatar => ({ type: 'SET-CURRENT-USER-AVATAR', avatar })
const setAuthStatus = () => ({ type: 'SET-AUTH-STATUS' })

/*Thunks Creators*/
 export const authMe = () => dispatch => {
    headerAPI.getAuthorizedPersonData()
        .then(res => {
            dispatch(setCurrentUserInfo({
                myId: res.data.data.id,
                login: res.data.data.login,
                email: res.data.data.email,
            }))

            if (res.data.data.id !== undefined) {
                dispatch(setAuthStatus())
                headerAPI.getAvatar(res.data.id)
                    .then(avatar => {
                        (setCurrentUserAvatar(avatar))
                    })
            }
        })
} 


let InitialState = {
    myId: null,
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
                myId: action.data.myId,
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