import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { changeFollowStatus, getUsers } from "../../../Redux/usersPageReducer";
import UsersPage from './UsersPage';
import Preloader from '../../Preloader/Preloader';

class UsersPageContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.friend, this.props.count, this.props.currentPage)
    }

    GetNewUsers = page => {
        this.props.getUsers(this.props.friend, this.props.count, page)
    }

    ToggleFollowStatus = (id, val) => {
        this.props.changeFollowStatus(id, val)
    }

    render() {
        return (
            <div>
                {(this.props.loading) ? <Preloader /> :
                    <UsersPage
                        getNewUsers={this.GetNewUsers}
                        toggleFollowStatus={this.ToggleFollowStatus}
                        users={this.props.users}
                        currentPage={this.props.currentPage}
                        totalCount={this.props.totalCount}
                        count={this.props.count}
                        title={this.props.title}
                        isAuth={this.props.isAuth}
                    />}
            </div>
        )
    }
};

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