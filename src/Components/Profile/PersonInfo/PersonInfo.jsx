import React from 'react'
import styles from './PersonInfo.module.css'
import Avatar from './Avatar/Avatar'
import Status from './Status/Status'
import tick from '../../../assets/Pictures/tick.png'
import cross from '../../../assets/Pictures/cross.png'
import UpdateAvatarForm from './UpdateAvatarForm/UpdateAvatarForm'

const PersonInfo = props => {
    return (
        <div className={styles.ContentWrapper}>
            <div className={styles.background}></div>
            <div className={styles.aboutPerson}>
                <Avatar avatar={props.avatar} myProfile={props.myProfile}
                    toggleAvatarEditMode={props.toggleAvatarEditMode}
                    avatarEditMode={props.avatarEditMode} />
                {!props.avatarEditMode
                    ? <div className={styles.info}>
                        <div className={styles.username}><b> {props.fullName} </b></div>
                        <div className={styles.jobTxt}>
                            Avaliable for a hire </div>
                        <div className={styles.job}> 
                            <img src={props.job ? tick : cross} alt="" />
                        </div>
                        <Status status={props.status}
                            setNewStatus={props.setNewStatus}
                            isAuth={props.isAuth}
                            myProfile={props.myProfile}
                        />
                    </div>
                    : <UpdateAvatarForm
                        updateAvatar={props.updateAvatar}
                        toggleAvatarEditMode={props.toggleAvatarEditMode} />}
            </div>
        </div>

    )
}

export default PersonInfo