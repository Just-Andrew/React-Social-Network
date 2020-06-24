import React from 'react';
import { connect } from 'react-redux';
import { toggleFollowStatus, setUsers, setTotalCount, setCurrentPage, toggleLoader } from "../../../Redux/usersPageReducer";
import /* * as */ axios from 'axios';
import UsersPage from './UsersPage';
import Preloader from '../../Preloader/Preloader';

class UsersAPI extends React.Component {
    componentDidMount() {
        this.props.toggleLoader(true)
        let getUsersUrl = `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.count}&friend=${this.props.friend}`
        axios.get(getUsersUrl, { withCredentials: true })
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
        let getUsersUrl = `https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.count}&friend=${this.props.friend}`;
        axios.get(getUsersUrl, { withCredentials: true })
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.toggleLoader(false)
            })
    }


    ToggleFollowStatus = id => {
        let getFollowStatusUrl = `https://social-network.samuraijs.com/api/1.0/follow/${id}`
        axios.get(getFollowStatusUrl, {
            withCredentials: true,
            headers: {
                'API-KEY': '69a84a29-fda8-47e5-9730-61a55a5fcdd2'
            }
        })
            .then(res => {
                if (res.data) {
                    this.props.toggleFollowStatus(id, false)
                    axios.delete(getFollowStatusUrl, {
                        withCredentials: true,
                        headers: {
                            'API-KEY': '69a84a29-fda8-47e5-9730-61a55a5fcdd2'
                        }
                    })
                        .then(res2 => {
                            console.log('UNFOLLOWED')
                        }
                        )
                } else {
                    this.props.toggleFollowStatus(id, true)
                    axios.post(getFollowStatusUrl, {}, {
                        withCredentials: true,
                        headers: {
                            'API-KEY': '69a84a29-fda8-47e5-9730-61a55a5fcdd2'
                        }
                    })
                        .then(res2 => {
                            console.log('FOLLOWED')
                        })
                }
            })


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
    { toggleFollowStatus, setUsers, setTotalCount, setCurrentPage, toggleLoader })(UsersAPI);

export default UsersPageContainer