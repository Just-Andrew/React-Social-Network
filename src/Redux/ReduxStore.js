import {createStore, combineReducers, applyMiddleware} from 'redux'
import profileReducer from './profileReducer'
import messagesPageReducer from './messagesPageReducer'
import usersPageReducer from './usersPageReducer'
import  headerReducer  from './headerReducer'
import ThunkMiddleware from 'redux-thunk'

let reducers = combineReducers({
    profile: profileReducer,
    messagesPage: messagesPageReducer,
    usersPage: usersPageReducer,
    header: headerReducer
})

let store = createStore(reducers, applyMiddleware(ThunkMiddleware))

window.store = store

export default store