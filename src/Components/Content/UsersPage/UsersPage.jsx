import React from 'react';
import styles from './UsersPage.module.css';
import { Redirect } from 'react-router-dom'
import User from './User';

const Title = props => {
    return (
        <div className={styles.title}><b>{props.title}</b></div>
    )
}

const Users = props => {
    let users = props.users.map(u =>
        <User
            toggleFollowStatus={props.toggleFollowStatus}
            photo={u.photos.large}
            isButtonDisabled={u.isButtonDisabled}
            id={u.id}
            status={u.status}
            name={u.name}
            followed={u.followed}
        />)

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
                <i key={i}
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
        !props.isAuth ? <Redirect to='/login' />
            : <div className={styles.UsersPageWrapper} >
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