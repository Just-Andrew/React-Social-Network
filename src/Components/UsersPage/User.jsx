import React from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import styles from './User.module.css'
import NoPhotoImage from '../../assets/Pictures/NoPhotoImg.jpg'

const User = props => {
    return (
        <div className={classNames(styles.userBlock, { [styles.userBlockWithNoButton]: !props.isAuth })}
            key={props.id}>
            <div className={styles.avatarAndButton}>
                <div className={styles.avatar}>
                    <img
                        src={props.photo === null ? NoPhotoImage : props.photo}
                        alt='' />
                </div>
                {props.isAuth
                    ? <button disabled={props.isButtonDisabled} onClick={() => { props.toggleFollowStatus(props.id, props.followed) }}>
                        {props.followed === true ? 'Unfriend' : 'Add'}
                    </button> : ''}
            </div>
            <div className={styles.userInfo}>

                <div className={styles.city}>{'Russia'}</div>
                <NavLink to={`/profile/${props.id}`}>
                    <div className={styles.userName}>{`${props.name}`}</div>
                </NavLink>
                <br />
                <br />
                <div className={styles.status}>
                    {props.status === null ?
                        <i className={styles.noStatus}>This user doesn't have any status</i> :
                        props.status}
                </div>
            </div>
        </div>
    )
}
export default User