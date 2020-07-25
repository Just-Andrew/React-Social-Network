import { toggleLoader } from './appReducer';
import { usersAPI } from '../API/api'

/* Action Types */
type toggleFollowStatusActionType = {
    type: 'TOGGLE-FOLLOW-STATUS'
    id: number
    val: boolean
}

type setUsersActionType = {
    type: 'SET-USERS'
    users: Array<object>
}

type setTotalCountActionType = {
    type: 'SET-TOTAL-COUNT'
    num: number
}

type setCurrentPageActionType = {
    type: 'SET-CURRENT-PAGE'
    page: number
}

type toggleButtonStatusActionType = {
    type: 'TOGGLE-BUTTON-STATUS'
    id: number
    val: boolean
}


/*Action Creators*/
const toggleFollowStatus = (id: number, val: boolean): toggleFollowStatusActionType => ({ type: 'TOGGLE-FOLLOW-STATUS', id, val })
const setUsers = (users: Array<object>): setUsersActionType => ({ type: 'SET-USERS', users })
const setTotalCount = (num: number): setTotalCountActionType => ({ type: 'SET-TOTAL-COUNT', num })
const setCurrentPage = (page: number): setCurrentPageActionType => ({ type: 'SET-CURRENT-PAGE', page })
const toggleButtonStatus = (id: number, val: boolean): toggleButtonStatusActionType => ({ type: 'TOGGLE-BUTTON-STATUS', id, val })


/*Thunk Creators*/
export const getUsers = (friend: boolean, count: number, page: number) => async (dispatch: Function) => {
    dispatch(toggleLoader(true))
    dispatch(setCurrentPage(page))
    let res = await usersAPI.getUsers(friend, count, page)
    dispatch(setUsers(res.data.items))
    dispatch(toggleLoader(false))
    dispatch(setTotalCount(res.data.totalCount))

}

export const changeFollowStatus = (id: number, val: boolean) => async(dispatch: Function) => {
    dispatch(toggleButtonStatus(id, true))
    await usersAPI.unfollow(id)
    if (val) {
        dispatch(toggleFollowStatus(id, false))
        dispatch(toggleButtonStatus(id, false))
    } else {
        await usersAPI.follow(id)
        dispatch(toggleFollowStatus(id, true))
        dispatch(toggleButtonStatus(id, false))
    }
}

type InitialStateType = {
    users: any
    currentPage: | number
    totalCount: number
    count: number
}

let InitialState = {
    users: [],
    currentPage: 1,
    totalCount: 0,
    count: 5,
}

let usersPageReducer = (state = InitialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'TOGGLE-FOLLOW-STATUS':
            let copiedState = { ...state, users: [...state.users] }
            copiedState.users.forEach((item: any, i: number, array: any) => {
                if (array[i].id === action.id) {
                    array[i].followed = action.val
                }
            }) 
            return copiedState

        case 'SET-USERS':
            let modifiedUsers: any = [...action.users]
            modifiedUsers.forEach((item: any, i: number) => {
                modifiedUsers[i].isButtonDisabled = false
            })
            return { ...state, users: modifiedUsers }

        case 'SET-TOTAL-COUNT':
            return { ...state, totalCount: action.num }

        case 'SET-CURRENT-PAGE':
            return { ...state, currentPage: action.page }

        case 'TOGGLE-BUTTON-STATUS':
            let newState = { ...state, users: [...state.users] }
            newState.users.forEach((item: any, i: number, array: any) => {
                if (array[i].id === action.id) {
                    array[i].isButtonDisabled = action.val
                }
            })
            return newState

        default:
            return state
    }
}
export default usersPageReducer