import React from 'react'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import Profile from './Profile'
import { setCurrentUserData, toggleLoader } from '../../../Redux/profileReducer'
import axios from 'axios'
import Preloader from '../../Preloader/Preloader'

class ProfileAPI extends React.Component {
    componentDidMount() {
        if (this.props.match.params.id !== undefined) {
            this.props.toggleLoader(true)
            let getCurrentUserProfileUrl = `https://social-network.samuraijs.com/api/1.0/profile/${this.props.match.params.id}`
            axios.get(getCurrentUserProfileUrl)
                .then(res => {
                    this.props.toggleLoader(false)
                    this.props.setCurrentUserData({
                        userId: res.data.userId,
                        avatar: res.data.photos.large,
                        fullName: res.data.fullName,
                        job: res.data.lookingForAJob
                    })
                })
        }
    }

    ArtificialRerender () {
        this.props.setCurrentUserData({
            userId: null,
            avatar: '',
            fullName: null,
            job: null
        })
    }
    render() {
        if (this.props.match.params.id === undefined) {
            this.ArtificialRerender()
        }
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

        );
    }
}


let mapStateToProps = state => ({
    userId: state.profile.currentUserId,
    avatar: state.profile.avatar,
    fullName: state.profile.fullName,
    job: state.profile.lookingForAJob,
    loading: state.profile.loading
})

let ProfileContainer = withRouter(connect(mapStateToProps, { setCurrentUserData, toggleLoader })(ProfileAPI))

export default ProfileContainer