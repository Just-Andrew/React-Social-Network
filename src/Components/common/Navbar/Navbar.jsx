import React from 'react'
import styles from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../../../Redux/authReducer'
import classNames from 'classnames'



const Navbar = props => {
    return (
        <nav className={styles.nav}>
            <div className={styles.navItem}>
                {/* <img src={profileIcon} alt='' className={styles.icon} /> */}
                <NavLink to={`/profile/${props.myId}`} className={styles.td}>Profile</NavLink>
            </div>
            <div className={styles.navItem}>
                {/* <img src={newsIcon} alt='' className={styles.icon} /> */}
                <NavLink to={`/news`} className={styles.td}>News</NavLink>
            </div>
            <div className={styles.navItem}>
                {/* <img src={friendsIcon} alt='' className={styles.icon} /> */}
                <NavLink to='/friends' className={styles.td}>Friends</NavLink>
            </div>
            <div className={styles.navItem}>
                {/* <img src={messagesIcon} alt='' className={styles.icon} /> */}
                <NavLink to='/dialogs' className={styles.td}>Messages</NavLink>
            </div>
            <div className={styles.navItem}>
                {/* <img src={usersIcon} alt='' className={styles.icon} /> */}
                <NavLink to='/users' className={styles.td}>Users</NavLink>
            </div>

            {props.isAuth
                ? <div className={classNames(styles.navItem, styles.exit)} onClick={props.logOut}>
                    <NavLink to='/login' className={styles.td}>Exit</NavLink>
                </div>
                : ''}
        </nav>
    )
}

let mapStateToProps = state => ({
    myId: state.authorization.myId,
    isAuth: state.authorization.isAuth
})

export default connect(mapStateToProps, { logOut })(Navbar)
