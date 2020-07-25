import React, { useState, useEffect } from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import { withRouter, Redirect } from "react-router-dom"
import Profile from "./Profile"
import {
  getUserProfile,
  setNewStatus,
  updateAvatar,
  toggleAvatarEditMode,
  getPosts
} from "../../Redux/profileReducer"
import Preloader from "../common/Preloader/Preloader"

const ProfileContainer = (props) => {
  let [currentUserId, setCurrentUserId] = useState(props.currentUserId)
  let [myProfile, setMyProfileValue] = useState(false)
  let [status, setStatus] = useState(props.status)

  useEffect(() => {
    if (props.currentUserId === props.myId && props.isAuth === true) {
      setMyProfileValue(true)
    } else {
      setMyProfileValue(false)
    }
    setStatus(props.status)
    props.getPosts()

    if (currentUserId !== props.match.params.id) {
      setCurrentUserId(props.match.params.id)
      props.getUserProfile(props.match.params.id)
    }
  }, [props.status, props.match.params.id, props.posts, props.currentUserId])

  return (
    <div>
      {props.match.params.id === "undefined" && <Redirect to="/login" />}
      {props.loading ? (
        <Preloader />
      ) : (
          <Profile
            avatar={props.avatar}
            fullName={props.fullName}
            job={props.job}
            status={props.status}
            setNewStatus={props.setNewStatus}
            isAuth={props.isAuth}
            myProfile={myProfile}
            avatarEditMode={props.avatarEditMode}
            toggleAvatarEditMode={props.toggleAvatarEditMode}
            updateAvatar={props.updateAvatar}
            aboutMe={props.aboutMe}
          />
        )}
    </div>
  )
}

let mapStateToProps = (state) => ({
  avatar: state.profile.avatar,
  fullName: state.profile.fullName,
  job: state.profile.lookingForAJob,
  status: state.profile.status,
  loading: state.app.loading,
  currentUserId: state.profile.currentUserId,
  myId: state.authorization.myId,
  isAuth: state.authorization.isAuth,
  avatarEditMode: state.profile.avatarEditMode,
  aboutMe: state.profile.aboutMe,
})

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getPosts,
    setNewStatus,
    updateAvatar,
    toggleAvatarEditMode,
  }),
  withRouter,
  React.memo
)(ProfileContainer)
