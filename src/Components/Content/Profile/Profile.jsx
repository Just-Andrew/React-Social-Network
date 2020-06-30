import React from 'react';
import styles from "./Profile.module.css";
import PostsContainer from './Posts/PostsContainer';
import PersonInfo from './PersonInfo/PersonInfo';
import AddPostContainer from './AddPost/AddPostContainer';

const Profile = props => {
    return (
        <div className={styles.profile}>
            <PersonInfo 
            avatar={props.avatar}
            fullName={props.fullName}
            job={props.job}
            status={props.status}
            myId={props.myId}
            currentUserId={props.currentUserId}
            setNewStatus={props.setNewStatus}
            isAuth={props.isAuth}
            />

           

            <PostsContainer />

            <hr className={styles.line} />

            <AddPostContainer/>

        </div>
    );
}

export default Profile;