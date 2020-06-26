import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Profile from './Profile'
import { getUserProfile, setCurrentUserData } from '../../../Redux/profileReducer'
import Preloader from '../../Preloader/Preloader'
import withRedirect from '../../../HOCs/redirect'


class GetProfile extends React.Component {
    componentDidMount() {
        if (this.props.match.params.id === undefined) {
            this.props.getUserProfile(/* this.props.myId */ 8833)
        } else {
            this.props.getUserProfile(this.props.match.params.id)
        }

    }

    render() {
        return (
            <div>
                {this.props.loading ?
                    <Preloader /> :
                    <Profile
                        avatar={this.props.avatar}
                        fullName={this.props.fullName}
                        job={this.props.job}
                    />}
            </div>
        )
    }
}

let mapStateToProps = state => ({
    userId: state.profile.currentUserId,
    avatar: state.profile.avatar,
    fullName: state.profile.fullName,
    job: state.profile.lookingForAJob,
    loading: state.profile.loading,
    myId: state.header.myId,
    isAuth: state.header.isAuth
})

export default compose(
    connect(mapStateToProps, { getUserProfile, setCurrentUserData }),
    withRouter,
    withRedirect
)(GetProfile)
