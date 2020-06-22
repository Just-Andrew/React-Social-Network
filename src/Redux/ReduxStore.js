import {createStore, combineReducers} from 'redux'
import profileReducer from './profileReducer'
import messagesPageReducer from './messagesPageReducer'
import usersPageReducer from './usersPageReducer'
import  headerReducer  from './headerReducer'

let reducers = combineReducers({
    profile: profileReducer,
    messagesPage: messagesPageReducer,
    usersPage: usersPageReducer,
    header: headerReducer
})

let store = createStore(reducers)

window.store = store

export default store