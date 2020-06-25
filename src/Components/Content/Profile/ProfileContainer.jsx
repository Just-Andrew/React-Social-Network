import React from 'react'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import Profile from './Profile'
import { getUserProfile } from '../../../Redux/profileReducer'
import Preloader from '../../Preloader/Preloader'

class GetProfile extends React.Component {
    componentDidMount() {
        this.props.getUserProfile(this.props.match.params.id)
    }

    ArtificialRerender() {
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

let ProfileContainer = withRouter(connect(mapStateToProps, { getUserProfile })(GetProfile))

export default ProfileContainer