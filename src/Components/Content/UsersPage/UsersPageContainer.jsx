import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { changeFollowStatus, getUsers } from "../../../Redux/usersPageReducer";
import UsersPage from './UsersPage';
import Preloader from '../../Preloader/Preloader';

const UsersPageContainer = props => {
    let [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        if (currentPage === 0) {
            setCurrentPage(1)
            props.getUsers(props.friend, props.count, 1)
        }
    })

    let GetNewUsers = page => {
        props.getUsers(props.friend, props.count, page)
    }

    let ToggleFollowStatus = (id, val) => {
        props.changeFollowStatus(id, val)
    }

    return (
        <div>
            {(props.loading) ? <Preloader /> :
                <UsersPage
                    getNewUsers={GetNewUsers}
                    toggleFollowStatus={ToggleFollowStatus}
                    users={props.users}
                    currentPage={props.currentPage}
                    totalCount={props.totalCount}
                    count={props.count}
                    title={props.title}
                    isAuth={props.isAuth}
                    friend={props.friend}
                />}
        </div>
    )
}

let mapStateToProps = state => ({
    users: state.usersPage.users,
    currentPage: state.usersPage.currentPage,
    totalCount: state.usersPage.totalCount,
    count: state.usersPage.count,
    loading: state.usersPage.loading,
    isAuth: state.authorization.isAuth
})

export default compose(
    connect(mapStateToProps, { changeFollowStatus, getUsers })
)(UsersPageContainer)