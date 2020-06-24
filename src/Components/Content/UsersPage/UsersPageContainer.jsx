import React from 'react';
import { connect } from 'react-redux';
import { toggleFollowStatus, setUsers, setTotalCount, setCurrentPage, toggleLoader } from "../../../Redux/usersPageReducer";
import /* * as */ axios from 'axios';
import UsersPage from './UsersPage';
import Preloader from '../../Preloader/Preloader';

import {usersAPI} from '../../../API/api'

class GetUsers extends React.Component {
    componentDidMount() {
        this.props.toggleLoader(true)
            usersAPI.getUsers(this.props.friend, this.props.count)
            .then(response => {
                console.log(response.data)
                this.props.setUsers(response.data.items)
                this.props.toggleLoader(false)
                if (response.data.totalCount > 50) {
                    this.props.setTotalCount(50)
                } else {
                    this.props.setTotalCount(response.data.totalCount)
                }
            })
    }

    GetNewUsers = page => {
        this.props.toggleLoader(true);
        this.props.setCurrentPage(page);
        usersAPI.getUsers(this.props.friend, this.props.count, page)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.toggleLoader(false)
            })
    }


    ToggleFollowStatus = (id, val) => {
                if (val) {
                    this.props.toggleFollowStatus(id, false)
                    usersAPI.unfollow(id)
                        .then(res2 => {
                            console.log('UNFOLLOWED')
                        })                        
                } else {
                    this.props.toggleFollowStatus(id, true)
                    usersAPI.follow(id)
                        .then(res2 => {
                            console.log('FOLLOWED')
                        })
                }
    }

    render() {
        return (
            <div>
                {(this.props.loading) ? <Preloader /> :
                    <UsersPage
                        getNewUsers={this.GetNewUsers}
                        toggleFollowStatus={this.ToggleFollowStatus}
                        totalCount={this.props.totalCount}
                        count={this.props.count}
                        currentPage={this.props.currentPage}
                        users={this.props.users}
                        title={this.props.title}
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
    loading: state.usersPage.loading
})

let UsersPageContainer = connect(mapStateToProps,
    { toggleFollowStatus, setUsers, setTotalCount, setCurrentPage, toggleLoader })(GetUsers);

export default UsersPageContainer