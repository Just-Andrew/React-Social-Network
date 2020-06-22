import React from 'react';
import styles from './UsersPage.module.css';
import NoPhotoImage from '../../../assets/Pictures/NoPhotoImg.jpg'
import { NavLink } from 'react-router-dom';

const UsersPage = props => {

    let users = props.users.map(u => {
        return (
            <div className={styles.userBlock} key={u.id}>
                <div className={styles.avatarAndButton}>
                    <div className={styles.avatar}>
                        <img
                            src={u.photos.large === null ? NoPhotoImage : u.photos.large}
                            alt='' />
                    </div>

                    <button onClick={() => { props.toggleFollowStatus(u.id) }}>
                        {u.followed === true ? 'Unfollow' : 'Follow'}
                    </button>
                </div>

                <div className={styles.userInfo}>

                    <div className={styles.city}>{'Hell knows where (s)he\'s from'}</div>
                     <NavLink to={`/profile/${u.id}`}> *
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
    /* ----- */

    /*pages switches */
    let pagesAmount = Math.ceil(props.totalCount / props.count);
    let pagesSwitches = [];
    for (let i = 1; i <= pagesAmount; i++) {
        pagesSwitches[i] = <i
            className={props.currentPage === i ? styles.selectedPage : ''}
            onClick={(e) => { props.getNewUsers(i) }}>{i + ' '}
        </i>
    }
    /* ---------- */



    /*component itself */
    return (
        <div className={styles.UsersPageWrapper} >

            <div className={styles.title}><b>All the users registered:</b></div>
            <div className={styles.users}>
                {users}
            </div>

            <div className={styles.pages}>
                {pagesSwitches}
            </div>

        </div>
    );
};


export default UsersPage;