import React from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import { setCurrentUserInfo, setCurrentUserAvatar, setAuthStatus } from '../../Redux/headerReducer'
import Header from './Header'
import { headerAPI } from '../../API/api'

class HeaderAPI extends React.Component {
    componentDidMount() {
        headerAPI.getAuthStatus()
            .then(res => {
                this.props.setCurrentUserInfo({
                    id: res.data.data.id,
                    login: res.data.data.login,
                    email: res.data.data.email,
                })

                if (this.props.id !== undefined) {
                    this.props.setAuthStatus()
                    headerAPI.getAvatar(this.props.id)
                        .then(avatar => {
                            this.props.setCurrentUserAvatar(avatar)
                        })
                }
            })
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
    id: state.header.id,
    login: state.header.login,
    email: state.header.email,
    avatar: state.header.avatar,
    isAuth: state.header.isAuth
})

const HeaderContainer = connect(mapStateToProps, { setCurrentUserInfo, setCurrentUserAvatar, setAuthStatus })(HeaderAPI)
export default HeaderContainer