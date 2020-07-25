import { authMe } from "./authReducer"

/* Action Types */
type setInitializationStatusActionType = { type: 'SET-INITIALIZATION-STATUS' }

type toggleLoaderActionType = {
    type: 'TOGGLE-LOADER'
    val: boolean
}
/*Action Creators */
const setInitializationStatus = (): setInitializationStatusActionType => ({ type: 'SET-INITIALIZATION-STATUS' })
export const toggleLoader = (val: boolean): toggleLoaderActionType => ({ type: 'TOGGLE-LOADER', val })
/*Thunks Creators*/
export const initialize = () => (dispatch: Function) => {
    let promise = dispatch(authMe())
    promise.then(() => {
        dispatch(setInitializationStatus())
    })
}

type InitialStateType = {
    finishedInitialization: boolean
    loading: boolean
}

let InitialState = {
    finishedInitialization: false,
    loading: false
}

let appReducer = (state = InitialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET-INITIALIZATION-STATUS':
            return {
                ...state,
                finishedInitialization: true
            }

        case 'TOGGLE-LOADER':
            return { ...state, loading: action.val }

        default:
            return state
    }
}
export default appReducer