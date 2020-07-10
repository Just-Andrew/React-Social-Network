import React, { useState, useEffect } from 'react'
import styles from './PersonInfo.module.css'
import Avatar from './Avatar/Avatar'
import Status from './Status/Status'
import tick from '../../../assets/Pictures/tick.png'
import cross from '../../../assets/Pictures/cross.png'
import UpdateAvatarForm from './UpdateAvatarForm/UpdateAvatarForm'



const PersonInfo = props => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.background}></div>
            <div className={styles.aboutPerson}>
                <Avatar avatar={props.avatar} myProfile={props.myProfile}
                    toggleAvatarEditMode={props.toggleAvatarEditMode}
                    avatarEditMode={props.avatarEditMode} />
                {!props.avatarEditMode || !props.myProfile
                    ? <div className={styles.info}>
                        <div className={styles.username}><b> {props.fullName} </b></div>
                        <div className={styles.job}>Avaliable for a hire
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



export default PersonInfo;