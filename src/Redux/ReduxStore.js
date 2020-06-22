import {createStore, combineReducers} from 'redux';
import profileReducer from './profileReducer';
import messagesPageReducer from './messagesPageReducer';
import usersPageReducer from './usersPageReducer';

let reducers = combineReducers({
    profile: profileReducer,
    messagesPage: messagesPageReducer,
    usersPage: usersPageReducer
})

let store = createStore(reducers);

export default store;