import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import Profile from './Profile'
import { getUserProfile, setNewStatus } from '../../Redux/profileReducer'
import Preloader from '../common/Preloader/Preloader'


const ProfileContainer = props => {
    let [currentUserId, setCurrentUserId] = useState(props.currentUserId)
    let [myProfile, setMyProfileValue] = useState(false)
    let [status, setStatus] = useState(null)

    let RegenerateCurrentPageData = () => {
        if (props.currentUserId === props.myId && props.isAuth === true) {
            setMyProfileValue(true)

            console.log('rerender')
        } else {
            setMyProfileValue(false)
        }

        if (status !== props.status) {
            setStatus(props.status)
        }

        if (currentUserId !== props.match.params.id) {
            setCurrentUserId(props.match.params.id)
            props.getUserProfile(props.match.params.id)
        }
    }

    useEffect(() => RegenerateCurrentPageData())

    return (
        <div>
            {props.match.params.id === 'undefined' && <Redirect to='/login' />}
            {props.loading ?
                <Preloader /> :
                <Profile
                    avatar={props.avatar}
                    fullName={props.fullName}
                    job={props.job}
                    status={props.status}
                    setNewStatus={props.setNewStatus}
                    isAuth={props.isAuth}
                    myProfile={myProfile}
                />}
        </div>
    )
}

let mapStateToProps = state => ({
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
    React.memo
)(ProfileContainer)