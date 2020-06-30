import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { reducer as formReducer } from 'redux-form'
import profileReducer from './profileReducer'
import messagesPageReducer from './messagesPageReducer'
import usersPageReducer from './usersPageReducer'
import authReducer from './authReducer'
import ThunkMiddleware from 'redux-thunk'

let reducers = combineReducers({
    profile: profileReducer,
    messagesPage: messagesPageReducer,
    usersPage: usersPageReducer,
    authorization: authReducer,
    form: formReducer
})

let store = createStore(reducers, compose(
    applyMiddleware(ThunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    )
)

window.store = store

export default store