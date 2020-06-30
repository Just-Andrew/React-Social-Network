import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { authMe } from '../../Redux/authReducer'
import Header from './Header'

class HeaderAPI extends React.Component {
    componentDidMount() {
        this.props.authMe()
        console.log(this.props)
    }
    
    componentDidUpdate(pP, pS) {
        if(this.props.login !== pP.login) {
            this.props.authMe()
        }
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
    login: state.authorization.login,
    avatar: state.authorization.avatar,
    isAuth: state.authorization.isAuth
})

export default compose(
    connect(mapStateToProps, { authMe })
)(HeaderAPI)
