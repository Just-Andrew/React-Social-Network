import React from 'react'
import styles from "./Profile.module.css"
import PostsContainer from './Posts/Posts'
import PersonInfo from './PersonInfo/PersonInfo'
import AddPostContainer from './AddPost/AddPost'

const Profile = props => {
    return (
        <div className={styles.ContentWrapper}>
            <PersonInfo
                avatar={props.avatar}
                fullName={props.fullName}
                job={props.job}
                status={props.status}
                setNewStatus={props.setNewStatus}
                isAuth={props.isAuth}
                myProfile={props.myProfile}
                avatarEditMode={props.avatarEditMode}
                toggleAvatarEditMode={props.toggleAvatarEditMode}
                updateAvatar={props.updateAvatar}
            />
            <PostsContainer  text={props.aboutMe}/>
            {props.myProfile === true
                ? <>
                    <AddPostContainer />
                </>
                : ''
            }

        </div>
    )
}

export default Profile