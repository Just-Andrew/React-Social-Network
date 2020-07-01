import { authMe } from "./authReducer"

/*Action Creators */
const setInitializationStatus = () => ({type: 'SET-INITIALIZATION-STATUS'})

/*Thunks Creators*/
export const initialize = () => dispatch => {
    let promise = dispatch(authMe())
    promise.then(()=> {
        dispatch(setInitializationStatus())
    })
}

let InitialState = {
    finishedInitialization: false
}

let appReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'SET-INITIALIZATION-STATUS':
            return {
                ...state,
                finishedInitialization: true
            }
    }
    return state
}
export default appReducer;