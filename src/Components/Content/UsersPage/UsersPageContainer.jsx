import { connect } from "react-redux";
import React from 'react';
import { toggleFollowStatus, setUsers, setTotalCount, setCurrentPage, toggleLoader } from "../../../Redux/usersPageReducer";
import /* * as */ axios from 'axios';
import UsersPage from './UsersPage';
import Preloader from "../../Preloader/Preloader";

class UsersAPI extends React.Component {
    componentDidMount() {
        console.log(this.props);
        let getUsersUrl = `https://social-network.samuraijs.com/api/1.0/users?count=5`;
        axios.get(getUsersUrl)
            .then(response => {
                console.log('users :', response.data.items);
                this.props.setUsers(response.data.items);
                this.props.setTotalCount(50);
                this.props.toggleLoader(false);
            })
    }

    GetNewUsers = page => {
        this.props.toggleLoader(true);
        this.props.setCurrentPage(page);
        let getUsersUrl = `https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.count}`;
        axios.get(getUsersUrl)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.toggleLoader(false);
            })
    }


    ToggleFollowStatus = id => {
        this.props.toggleFollowStatus(id);
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
                    />}


            </div>
        )


    }
};


let mapStateToProps = state => {
    return {
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        totalCount: state.usersPage.totalCount,
        count: state.usersPage.count,
        loading: state.usersPage.loading
    }
};

let UsersPageContainer = connect(mapStateToProps,
    { toggleFollowStatus, setUsers, setTotalCount, setCurrentPage, toggleLoader })(UsersAPI);

export default UsersPageContainer