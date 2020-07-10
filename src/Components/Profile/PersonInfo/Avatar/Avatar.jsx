import React from 'react'
import styles from './Avatar.module.css'
import NoPhotoImg from '../../../../assets/Pictures/NoPhotoImg.jpg'
import changeAvatarIcon from '../../../../assets/Pictures/change_avatar_icon.png'

const Avatar = props => {
    return (
        <>
            <div className={styles.avatar}>
                <img src={props.avatar === null ? NoPhotoImg : props.avatar}
                    alt="" />
            </div >
            {props.myProfile && !props.avatarEditMode
                ? <div className={styles.changeAvatarBtn} onClick={() => {
                    props.toggleAvatarEditMode(true)
                }}>
                    <img src={changeAvatarIcon}
                        alt="" />
                </div>
                : ''}
        </>
    )
}

export default Avatar