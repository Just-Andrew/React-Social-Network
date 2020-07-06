import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { reducer as form } from 'redux-form'
import app from './appReducer'
import profile from './profileReducer'
import messagesPage from './messagesPageReducer'
import usersPage from './usersPageReducer'
import authorization from './authReducer'
import ThunkMiddleware from 'redux-thunk'

let reducers = combineReducers({
    app,
    profile,
    messagesPage,
    usersPage,
    authorization,
    form
})

let store = createStore(reducers, compose(
    applyMiddleware(ThunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    )
)

window.store = store

export default store