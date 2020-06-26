import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { authMe } from '../../Redux/headerReducer'
import Header from './Header'

class HeaderAPI extends React.Component {
    componentDidMount() {
        this.props.authMe()
    }

    render() {
        return (
            <Header
                isAuth={this.props.isAuth}
                avatar={this.props.avatar}
                login={this.props.login}
            />
        )
    }
}

let mapStateToProps = state => ({
    login: state.header.login,
    avatar: state.header.avatar,
    isAuth: state.header.isAuth
})

export default compose(
    connect(mapStateToProps, { authMe })
)(HeaderAPI)
