import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import Profile from './Profile'
import { getUserProfile, setNewStatus } from '../../../Redux/profileReducer'
import Preloader from '../../Preloader/Preloader'
import withRedirect from '../../../HOCs/redirect'


class ProfileContainer extends React.Component {

    state = {
        myId: this.props.myId,
        currentUserId: this.props.currentUserId,
        myProfile: false
    }

    toggleMyProfileValue = () => {
        if (this.props.currentUserId === this.props.myId && this.props.isAuth === true) {
            this.state.myProfile = true
        } else {
            this.state.myProfile = false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this.toggleMyProfileValue()
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }

        if (prevProps.currentUserId !== this.props.currentUserId) {
            this.setState({
                currentUserId: this.props.currentUserId
            })
        }

        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.getUserProfile(this.props.match.params.id)
        }
    }

    componentDidMount() {
        this.toggleMyProfileValue()
        this.props.getUserProfile(this.props.match.params.id)
    }

    render() {
        return (
            <div>
                {this.props.match.params.id === 'undefined' && <Redirect to='/login' />}
                {this.props.loading ?
                    <Preloader /> :
                    <Profile
                        avatar={this.props.avatar}
                        fullName={this.props.fullName}
                        job={this.props.job}
                        status={this.props.status}
                        setNewStatus={this.props.setNewStatus}
                        isAuth={this.props.isAuth}
                        myProfile={this.state.myProfile}
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
)(ProfileContainer)
