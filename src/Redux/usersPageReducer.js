export const toggleFollowStatus = (id, val) => ({ type: 'TOGGLE-FOLLOW-STATUS', id, val })
export const setUsers = users => ({ type: 'SET-USERS', users })
export const setTotalCount = num => ({ type: 'SET-TOTAL-COUNT', num })
export const setCurrentPage = page => ({ type: 'SET-CURRENT-PAGE', page })
export const toggleLoader = val => ({ type: 'TOGGLE-LOADER', val })

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
            });
            return copiedState;

        case 'SET-USERS':
            console.log(action.users);
            return { ...state, users: action.users };

        case 'SET-TOTAL-COUNT':
            return { ...state, totalCount: action.num }

        case 'SET-CURRENT-PAGE':
            console.log(action.page)
            return { ...state, currentPage: action.page }

        case 'TOGGLE-LOADER':
            return { ...state, loading: action.val }
    }
    return state
}
export default usersPageReducer;