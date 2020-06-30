import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Profile from './Profile'
import { getUserProfile, setNewStatus } from '../../../Redux/profileReducer'
import Preloader from '../../Preloader/Preloader'
import withRedirect from '../../../HOCs/redirect'


class GetProfile extends React.Component {
    componentDidUpdate(prevProps, prevState) {
       if(prevProps.match.params.id !== this.props.match.params.id) {
        this.props.getUserProfile(this.props.match.params.id)
       }
    }

    componentDidMount() {
            this.props.getUserProfile(this.props.match.params.id)
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
                        status={this.props.status}
                        myId={this.props.myId}
                        currentUserId={this.props.currentUserId}
                        setNewStatus={this.props.setNewStatus}
                        isAuth={this.props.isAuth}
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
    status: state.profile.status,
    loading: state.profile.loading,
    currentUserId: state.profile.currentUserId,
    myId: state.authorization.myId,
    isAuth: state.authorization.isAuth
})

export default compose(
    connect(mapStateToProps, { getUserProfile, setNewStatus }),
    withRouter,
    // withRedirect
)(GetProfile)
