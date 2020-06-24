import React from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import { setCurrentUserInfo, setCurrentUserAvatar, setAuthStatus } from '../../Redux/headerReducer'
import Header from './Header'

class HeaderAPI extends React.Component {
    componentDidMount() {
        let getCurrentUserDataUrl = `https://social-network.samuraijs.com/api/1.0/auth/me`
        axios.get(getCurrentUserDataUrl, { withCredentials: true })
            .then(res => {
                this.props.setCurrentUserInfo({
                    id: res.data.data.id,
                    login: res.data.data.login,
                    email: res.data.data.email,
                })
                if (this.props.id !== undefined) {
                    this.props.setAuthStatus()

                    let getCurrentUserAvatarUrl = `https://social-network.samuraijs.com/api/1.0/profile/${this.props.id}`
                    axios.get(getCurrentUserAvatarUrl)
                        .then(res2 => {
                            this.props.setCurrentUserAvatar(res2.data.photos.large)
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