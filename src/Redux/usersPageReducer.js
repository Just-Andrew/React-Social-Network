import { usersAPI } from '../API/api'

/*Action Creators*/
const toggleFollowStatus = (id, val) => ({ type: 'TOGGLE-FOLLOW-STATUS', id, val })
const setUsers = users => ({ type: 'SET-USERS', users })
const setTotalCount = num => ({ type: 'SET-TOTAL-COUNT', num })
const setCurrentPage = page => ({ type: 'SET-CURRENT-PAGE', page })
const toggleLoader = val => ({ type: 'TOGGLE-LOADER', val })
const toggleButtonStatus = (id, val) => ({ type: 'TOGGLE-BUTTON-STATUS', id, val })


/*Thunk Creators*/
export const getUsers = (friend, count, page) => async dispatch => {
    dispatch(toggleLoader(true))
    dispatch(setCurrentPage(page))
    let res = await usersAPI.getUsers(friend, count, page)
    dispatch(setUsers(res.data.items))
    dispatch(toggleLoader(false))
    dispatch(setTotalCount(res.data.totalCount))

}

export const changeFollowStatus = (id, val) => async dispatch => {
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

let InitialState = {
    users: [],
    currentPage: 1,
    totalCount: 0,
    count: 5,
    loading: false
}

let usersPageReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'TOGGLE-FOLLOW-STATUS':
            let copiedState = { ...state, users: [...state.users] }
            copiedState.users.forEach((item, i, array) => {
                if (array[i].id === action.id) {
                    array[i].followed = action.val
                }
            })
            return copiedState;

        case 'SET-USERS':
            let modifiedUsers = [...action.users]
            modifiedUsers.forEach((item, i) => {
                modifiedUsers[i].isButtonDisabled = false
            })
            return { ...state, users: modifiedUsers }

        case 'SET-TOTAL-COUNT':
            return { ...state, totalCount: action.num }

        case 'SET-CURRENT-PAGE':
            return { ...state, currentPage: action.page }

        case 'TOGGLE-LOADER':
            return { ...state, loading: action.val }

        case 'TOGGLE-BUTTON-STATUS':
            let newState = { ...state, users: [...state.users] }
            newState.users.forEach((item, i, array) => {
                if (array[i].id === action.id) {
                    array[i].isButtonDisabled = action.val
                }
            })
            return newState
    }
    return state
}
export default usersPageReducer;