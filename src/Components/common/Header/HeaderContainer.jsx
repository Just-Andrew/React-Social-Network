import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { authMe } from '../../../Redux/authReducer'
import Header from './Header'

const HeaderContainer = props => {
        return (
            <Header
                isAuth={props.isAuth}
                avatar={props.avatar}
                login={props.login}
            />
        )
}

let mapStateToProps = state => ({
    login: state.authorization.login,
    avatar: state.authorization.avatar,
    isAuth: state.authorization.isAuth
})

export default compose(
    connect(mapStateToProps, { authMe })
)(HeaderContainer)
