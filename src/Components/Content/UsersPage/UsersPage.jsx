import React from 'react';
import styles from './UsersPage.module.css';
import NoPhotoImage from '../../../assets/Pictures/NoPhotoImg.jpg'
import { NavLink } from 'react-router-dom';

const Title = props => {
    return (
        <div className={styles.title}><b>{props.title}</b></div>
    )
}

const Users = props => {
    let users = props.users.map(u => {
        return (
            <div className={styles.userBlock} key={u.id}>
                <div className={styles.avatarAndButton}>
                    <div className={styles.avatar}>
                        <img
                            src={u.photos.large === null ? NoPhotoImage : u.photos.large}
                            alt='' />
                    </div>
                    <button onClick={() => { props.toggleFollowStatus(u.id, u.followed) }}>
                        {u.followed === true ? 'Unfollow' : 'Follow'}
                    </button>
                </div>
                <div className={styles.userInfo}>

                    <div className={styles.city}>{'Hell knows where (s)he\'s from'}</div>
                    <NavLink to={`/profile/${u.id}`}>
                        <div className={styles.userName}>{`${u.name}`}</div>
                    </NavLink>
                    <br />
                    <br />
                    <div className={styles.status}>
                        {u.status === null ?
                            <i className={styles.noStatus}>This user doesn't have any status</i> :
                            u.status}
                    </div>
                </div>
            </div>
        );
    })

    return (
        <div className={styles.users}>
            {users}
        </div>
    )
}

const Pages = props => {
    let pagesAmount = Math.ceil(props.totalCount / props.count)
    let pagesSwitches = []
    if (pagesAmount !== 1) {
        for (let i = 1; i <= pagesAmount; i++) {
            pagesSwitches[i] =
                <i
                    className={props.currentPage === i ? styles.selectedPage : ''}
                    onClick={(e) => { props.getNewUsers(i) }}>{i + ' '}
                </i>
        }
    } else {
        pagesSwitches = null
    }
    return (
        <div className={styles.pages}>
            {pagesSwitches === null ? '' : pagesSwitches}
        </div>
    )
}


const UsersPage = props => {
    return (
        <div className={styles.UsersPageWrapper} >
            <Title
                title={props.title}
            />

            <Users
                users={props.users}
                toggleFollowStatus={props.toggleFollowStatus}
            />

            <Pages
                totalCount={props.totalCount}
                count={props.count}
                currentPage={props.currentPage}
                getNewUsers={props.getNewUsers}
            />
        </div>
    );
}

export default UsersPage;