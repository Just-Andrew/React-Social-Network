import React from 'react';
import { Redirect } from 'react-router-dom';
import styles from './UsersPage.module.css';
import User from './User';
import PaginatorForHugeNumbers from '../common/Paginators/ManyPages/paginator'
import PaginatorForLowNumbers from '../common/Paginators/FewPages/paginator'


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
            isAuth={props.isAuth}
        />)

    return (
        <div className={styles.users}>
            {users}
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
                isAuth={props.isAuth}
            />
            {props.friend
                ? <PaginatorForLowNumbers
                    totalCount={props.totalCount}
                    count={props.count}
                    currentPage={props.currentPage}
                    getNewUsers={props.getNewUsers}
                />
                : <PaginatorForHugeNumbers
                    totalCount={props.totalCount}
                    count={props.count}
                    currentPage={props.currentPage}
                    getNewUsers={props.getNewUsers}
                />
            }
            {!props.isAuth && props.friend && <Redirect to='/login' />}
        </div>
    );
}

export default UsersPage;